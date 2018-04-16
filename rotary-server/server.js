import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import logger from './logger'
import morgan from 'morgan'
import members from './routes/members.route'
import connectToDb from './db'

const port = process.env.PORT
logger.stream = {
  write: function(message, encoding) {
    logger.info(message)
  }
}

connectToDb()

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(morgan('dev', {'stream': logger.stream}))

app.use('/members', members)

//Index route
app.get('/', (req, res) => {
  res.send('Invalid endpoint!')
})

app.listen(port, () => {
  logger.info('server started - ', port)
})
