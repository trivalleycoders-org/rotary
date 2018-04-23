import Mongoose from 'mongoose'
import { green, red } from '../log'
// import config from './config'

Mongoose.Promise = global.Promise
const connectToMongo = async () => {
  try {
    await Mongoose.connect(process.env.MONGODB_URI)
    green('Connected to mongo!!!')
  }
  catch (err) {
    red('Could not connect to MongoDB')
  }
}

export default connectToMongo
