
import expect from 'expect'
import request from 'supertest'
import  Member from  '../../models/member'
import { ObjectID } from 'mongodb'
import logger from '../../logger'
import 'babel-polyfill'
import app from '../server.js'

const members = [
  {
    _id: new ObjectID(),
    firstName: 'Jane'
  }, {
    _id: new ObjectID(),
    firstName: 'Jill',
  }
]

beforeEach((done) => {
  Member.remove({})
  .then(() => {
    return Member.insertMany(members)
  })
  .then(() => done())
  .catch((error) => {
    logger.error(error)
  })
})

describe('GET /members', () => {
  it('should get all members', (done) => {
    request(app).get('/members').expect(200).expect((res) => {
      expect(res.body.members.length).toBe(2)
    }).end(done)
  })
})
