import Mongoose from 'mongoose'
import { greenf, redf } form '../log'

// import config from '../core/config'

Mongoose.Promise = global.Promise
const connectToDb = async () => {
  try {
    await Mongoose.connect(process.env.MONGODB_URI)
    greenf('Connected to mongo!!!')
  }
  catch (err) {
    redf('Could not connect to MongoDB')
  }
}

export default connectToDb
