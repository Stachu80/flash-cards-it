import { JwtPayload } from 'jsonwebtoken'

declare module 'express-serve-static-core' {
  interface Request {
    user?: string | JwtPayload // Dostosuj typ w zależności od struktury Twojego JWT
  }
}
