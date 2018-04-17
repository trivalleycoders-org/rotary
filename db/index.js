import Mongoose from 'mongoose'
import logger from '../logger'
// import config from './config'

Mongoose.Promise = global.Promise
const connectToMongo = async () => {
  try {
    await Mongoose.connect(process.env.MONGODB_URI)
    logger.info('Connected to mongo!!!')
  }
  catch (err) {
    logger.error('Could not connect to MongoDB')
  }
}

export default connectToMongo
