import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import logger from '../logger'
import morgan from 'morgan'
import connectToDb from '../db'
import members from '../routes/members.route'
import roles from '../routes/roles.route'


logger.stream = {
  write: function(message, encoding) {
    logger.info(message)
  }
}

connectToDb()

export const app = express()
const port = process.env.PORT

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(morgan('dev', {'stream': logger.stream}))

app.use('/members', members)
app.use('/roles', roles)

//Index route
app.get('/', (req, res) => {
  res.send('Invalid endpoint!')
})

app.listen(port, () => {
  logger.info('server started - ', port)
})

export default app
