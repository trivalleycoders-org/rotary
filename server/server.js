import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import { green } from '../log'
import connectToDb from '../db'
import members from '../routes/members.route'
import roles from '../routes/roles.route'


connectToDb()

export const app = express()
const port = process.env.PORT

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(morgan('dev'))

app.use('/members', members)
app.use('/roles', roles)

//Index route
app.get('/', (req, res) => {
  res.send('Invalid endpoint!')
})

app.listen(port, () => {
  green('server started - ', port)
})

export default app
