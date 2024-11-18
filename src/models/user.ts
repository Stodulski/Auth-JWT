import UserModel from '../schema/user'
import { User, UserMongoDB } from '../types'

export const createUser = async (userData: User): Promise<UserMongoDB> => {
  try {
    const user = new UserModel(userData)
    const savedUser = await user.save()
    return savedUser
  } catch (e) {
    throw new Error()
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
  } catch (e) {
    return false
  }
}

export const findUser = async (
  username: string
): Promise<UserMongoDB | null> => {
  try {
    const user = await UserModel.findOne({ username })
    return user
  } catch (error) {
    return null
  }
}
