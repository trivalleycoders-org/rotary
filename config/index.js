import { green } from '../log'
require('dotenv').config()

const env = process.env.NODE_ENV || 'development'


// console.log('**dev**', process.env.MONGOD_URI_DEV)
if(env === 'development') {
  green('dev')
  process.env.PORT = 3001
  process.env.MONGODB_URI = process.env.MONGOD_URI_DEV
} else if(env === 'test') {
  green('test')
  process.env.PORT = 3001
  process.env.MONGODB_URI = process.env.MONGOD_URI_TEST
}
