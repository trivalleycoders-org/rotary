import Mongoose from 'mongoose'
import { yellowf, greenf, redf } from '../logger'
// import config from './config'

Mongoose.Promise = global.Promise

const readyState = () => {
  const state = Mongoose.connection.readyState
  switch (state) {
    case 0:
      yellowf('Mongoose: not connected')
      return
    case 1:
      greenf('Mongoose: connected')
      return
    case 2:
      yellowf('Mongoose: connecting')
      return
    case 3:
      yellowf('Mongoose: disconnecting')
      return
    default:
      redf('Mongoose: state unknown')
  }
}

export const connectToMongo = async () => {
  try {
    readyState()
    // await Mongoose.connect(process.env.MONGODB_URI)
    Mongoose.connect(process.env.MONGODB_URI)
    readyState()
    greenf('Connected to mongo!!!')
  }
  catch (err) {
    readyState()
    redf('Could not connect to MongoDB')
  }
}

export const disconnectFromMongo = async () => {
  const close = Mongoose.close()
}


export default { connectToMongo }
