import Mongoose from 'mongoose'
import { greenf, redf } from '../logger'
// import config from './config'

Mongoose.Promise = global.Promise

export const connectToMongo = async () => {
  try {
    await Mongoose.connect(process.env.MONGODB_URI)
    greenf('Connected to mongo!!!')
  }
  catch (err) {
    redf('Could not connect to MongoDB')
  }
}

export const disconnectFromMongo = async () => {
  const close = Mongoose.close()
}


export default { connectToMongo }
