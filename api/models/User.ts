import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database'

class User extends Model {
  public id!: number
  public username!: string
  public email!: string
  public passwordHash!: string
  public resetPasswordToken?: string
  public resetPasswordExpires?: Date
}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resetPasswordToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resetPasswordExpires: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'User',
  },
)

export default User
