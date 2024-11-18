import express from 'express'
import helmet from 'helmet'
import dotenv from 'dotenv'
import connectDB from './db'

import mainRoutes from './routes/mainRoutes'

dotenv.config()

const app = express()

connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(helmet())

app.use(mainRoutes)

const port =
  !isNaN(Number(process.env.PORT)) && Number(process.env.PORT) !== 0
    ? process.env.PORT
    : 3000

app.listen(port, () => {
  console.log(`Server start at port ${port}`)
})

export default app
