import { Document } from 'mongoose'

declare global {
  namespace Express {
    interface Request {
      user?: { username: string, id: string }
    }
  }
}

export interface TokenPayload {
  username: string
  id: string
}

export interface User {
  username: string
  email: string
  password: string
}

export interface UserEntry extends User {
  rePassword: string
}

export interface UserMongoDB extends User, Document {}
