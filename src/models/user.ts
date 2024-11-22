import UserModel from '../schema/user'
import { User, UserMongoDB, UserDataUpdate } from '../types'
import { MongoServerError } from 'mongodb'

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
  userEntry: UserDataUpdate
): Promise<string | UserMongoDB> => {
  try {
    const user = await UserModel.findById(id).select('-password')
    if (user === null) throw new Error()
    if (user.email !== userEntry.email) user.email = userEntry.email
    if (user.username !== userEntry.username) user.username = userEntry.username
    const savedUser = await user.save()
    return savedUser
  } catch (error) {
    if (error instanceof MongoServerError && error.code === 11000) {
      return 'Username or Email not valid'
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
