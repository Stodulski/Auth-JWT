import { Schema, model } from 'mongoose'
import { UserMongoDB } from '../types'

const userSchema = new Schema<UserMongoDB>({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }
})

const UserModel = model<UserMongoDB>('User', userSchema)

export default UserModel
