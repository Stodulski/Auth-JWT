import mongoose from 'mongoose'

const connectDB = (): void => {
  const dataBaseUri: string = process.env.DB_URI as string
  mongoose
    .connect(dataBaseUri)
    .then(() => {
      console.log('Data base connected')
    })
    .catch(e => {
      console.log(e)
    })
}

export default connectDB
