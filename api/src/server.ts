import express from 'express'
import cors from 'cors'
import jsonRoutes from './routes/jsonRoutes'
import sequelize from '../config/database'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User'
import { Request, Response, NextFunction } from 'express'
import nodemailer from 'nodemailer'
import crypto from 'crypto'
import { Op } from 'sequelize'

const app = express()
const PORT = process.env.PORT || 4000

// Enable CORS for all routes
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Use the data route
app.use('/json', jsonRoutes)

// JWT Authentication Middleware
const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'Brak tokenu, autoryzacja nieudana' })
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret') as jwt.JwtPayload
      ; (req as Request & { user?: jwt.JwtPayload }).user = decoded
    next()
  } catch (err) {
    console.error(err)
    res.status(403).json({ error: 'Token nieprawidłowy' })
  }
}

// Endpoint rejestracji
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({ username, email, passwordHash: hashedPassword })
    res.status(201).json({ message: 'Użytkownik zarejestrowany', userId: user.id })
  } catch (error) {
    res.status(500).json({ error: 'Nie udało się zarejestrować użytkownika' })
  }
})

// Endpoint logowania
app.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return res.status(404).json({ error: 'Użytkownik nie znaleziony' })
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash)
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Nieprawidłowe hasło' })
    }

    const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' })
    res.json({ message: 'Zalogowano pomyślnie', token })
  } catch (error) {
    res.status(500).json({ error: 'Nie udało się zalogować' })
  }
})

// Example of a protected route
app.get('/protected-route', authenticateJWT, (req: Request & { user?: any }, res: Response) => {
  res.json({ message: 'This is a protected route', user: req.user })
})

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'
const SMTP_CONFIG = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  user: process.env.SMTP_USER,
  pass: process.env.SMTP_PASS
}

const transporter = nodemailer.createTransport({
  host: SMTP_CONFIG.host,
  port: SMTP_CONFIG.port,
  secure: false,
  auth: {
    user: SMTP_CONFIG.user,
    pass: SMTP_CONFIG.pass
  }
})

// Endpoint resetowania hasła - żądanie resetu
app.post('/reset-password', async (req, res) => {
  const { email } = req.body

  try {
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return res.status(404).json({ error: 'Nie znaleziono użytkownika o podanym adresie email' })
    }

    // Generuj token resetowania hasła
    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetTokenExpiry = new Date(Date.now() + 3600000) // Token ważny przez 1 godzinę

    // Zapisz token w bazie danych
    await user.update({
      resetPasswordToken: resetToken,
      resetPasswordExpires: resetTokenExpiry
    })

    // Wyślij email z linkiem do resetowania hasła
    const resetLink = `http://localhost:4200/reset-password/${resetToken}`

    await transporter.sendMail({
      from: SMTP_CONFIG.user,
      to: email,
      subject: 'Reset hasła',
      html: `
        <h1>Reset hasła</h1>
        <p>Aby zresetować hasło, kliknij w poniższy link:</p>
        <a href="${resetLink}">Resetuj hasło</a>
        <p>Link jest ważny przez 1 godzinę.</p>
      `
    })

    res.json({ message: 'Link do resetowania hasła został wysłany na podany adres email' })
  } catch (error) {
    console.error('Błąd resetowania hasła:', error)
    res.status(500).json({ error: 'Wystąpił błąd podczas resetowania hasła' })
  }
})

// Endpoint resetowania hasła - ustawienie nowego hasła
app.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params
  const { password } = req.body

  try {
    const user = await User.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: {
          [Op.gt]: new Date()
        }
      }
    })

    if (!user) {
      return res.status(400).json({ error: 'Nieprawidłowy lub wygasły token resetowania hasła' })
    }

    // Zahaszuj nowe hasło
    const hashedPassword = await bcrypt.hash(password, 10)

    // Zaktualizuj hasło i wyczyść token
    await user.update({
      passwordHash: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null
    })

    res.json({ message: 'Hasło zostało pomyślnie zmienione' })
  } catch (error) {
    console.error('Błąd podczas zmiany hasła:', error)
    res.status(500).json({ error: 'Wystąpił błąd podczas zmiany hasła' })
  }
})

sequelize
  .authenticate()
  .then(() => {
    console.log('Połączono z bazą danych MySQL.')
    return sequelize.sync({ logging: console.log }) // Dodaj logowanie
  })
  .then(() => {
    console.log('Modele zsynchronizowane z bazą danych.')
  })
  .catch((err) => {
    console.error('Nie udało się połączyć z bazą danych:', err)
  })

// Start the server
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`)
})
