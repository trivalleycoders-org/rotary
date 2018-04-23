import Mongoose from 'mongoose'
import { green, red } form '../log'

// import config from '../core/config'

Mongoose.Promise = global.Promise
const connectToDb = async () => {
  try {
    await Mongoose.connect(process.env.MONGODB_URI)
    green('Connected to mongo!!!')
  }
  catch (err) {
    red('Could not connect to MongoDB')
  }
}

export default connectToDb
