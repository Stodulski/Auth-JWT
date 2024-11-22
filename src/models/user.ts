import UserModel from '../schema/user'
import { User, UserMongoDB } from '../types'
import { MongoServerError } from 'mongodb'
import { encryptPassword } from '../utils/bcrypt'
import { Error } from 'mongoose'

export const createUser = async (
  userData: User
): Promise<UserMongoDB | null> => {
  try {
    const user = new UserModel(userData)
    const savedUser = await user.save()
    if (savedUser === null) return null
    return savedUser
  } catch (error) {
    console.log(error)
    return null
  }
}

export const userDataAvailable = async (
  identifier: string,
  type: 'username' | 'email'
): Promise<boolean> => {
  try {
    const query =
      type === 'username' ? { username: identifier } : { email: identifier }
    const user = await UserModel.find(query)
    return user.length > 0
  } catch (error) {
    console.log(error)
    return false
  }
}

export const findUserByUsername = async (
  username: string
): Promise<UserMongoDB | null> => {
  try {
    const user = await UserModel.findOne({ username }).select('-password')
    return user
  } catch (error) {
    console.log(error)
    return null
  }
}

export const findUserById = async (id: string): Promise<null | UserMongoDB> => {
  try {
    const user = await UserModel.findById(id).select('-password')
    if (user === null) return null
    return user
  } catch (error) {
    console.log(error)
    return null
  }
}

export const updateUserById = async (
  id: string,
  userEntry: User
): Promise<string | UserMongoDB> => {
  try {
    const user = await UserModel.findById(id).select('-password')
    if (user === null) return 'An error has ocurred'
    if (user.email !== userEntry.email.toLowerCase()) {
      user.email = userEntry.email.toLowerCase()
    }
    if (user.username !== userEntry.username.toLowerCase()) {
      user.username = userEntry.username.toLowerCase()
    }
    if (userEntry.password.length > 0) {
      const encryptedPassword = await encryptPassword(
        userEntry.password.toLowerCase()
      )
      user.password = encryptedPassword
    }
    const savedUser = await user.save()
    return savedUser
  } catch (error) {
    if (error instanceof MongoServerError && error.code === 11000) {
      return 'Username or Email not valid'
    } else if (error instanceof Error.ValidationError) {
      return 'Password to short'
    } else {
      return 'An error has ocurred'
    }
  }
}

export const deleteUserById = async (
  id: string
): Promise<UserMongoDB | null> => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(id)
    if (deletedUser === null) return null
    return deletedUser
  } catch (error) {
    console.log(error)
    return null
  }
}
