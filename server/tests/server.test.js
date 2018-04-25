
// import expect from 'expect'
import request from 'supertest'
import 'babel-polyfill'
// import { app, closeDb } from '../server.js'
import  Member from  '../../models/member'
import { ObjectID } from 'mongodb'
import { yellow, blue, green } from '../../logger/'
import app from '../server'
import { disconnectFromMongo } from '../../db'


beforeAll(async () => {
  green('beforeAll')
  // await app.startServer()
  // yellow('app', app())
  // app = await require('../server')
})

beforeEach(function() {
  green('beforeEach')
  console.log('before every test in every file')
})

afterAll( async () => {
  green('afterAll')
  // closeDb()
  process.exit(0)
})

describe('Some test', () => {
  it('should = 1', () => {
    expect(1).toBe(1)
  })
})

const testMembers = [
  {
    _id: new ObjectID(),
    firstName: 'Jane',
    lastName: 'Doe',
    comments: ['comment 1', 'comment 2'],
    email: 'jane@doe.com',
    phone: {
      phoneType: 'Mobile',
      phoneNumber: '222-222-2222',
    }
  }, {
    _id: new ObjectID(),
    firstName: 'Jon',
    lastName: 'Snow',
    comments: ['comment 3', 'comment 4'],
    email: 'jon@snow.com',
    phone: {
      phoneType: 'Work',
      phoneNumber: '333-333-3333',
    }
  }
]

describe('POST /members', () => {
  it('should create a new member', (done) => {

    // const firstName = 'Jim'
    request(app).post('/members')
    .send(testMembers[0])
    .expect(200)
    .expect((res) => {
      expect(res.body.firstName).toBe(testMembers[0].firstName)
    }).end((err, res) => {
      if (err) {
        red(err)
        return done(err)
      }
      Member.find({firstName: testMembers[0].firstName}).then((members) => {
        // expect(members.length).toBe(1)
        // expect(members[0].firstName).toBe(testMembers[0].firstName)
        done()
      }).catch((e) => {
        console.log(e)
        done()
      })
    })
  })
})
