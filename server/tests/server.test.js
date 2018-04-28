
// import expect from 'expect'
import request from 'supertest'
import 'babel-polyfill'
// import { app, closeDb } from '../server.js'
import  Member from  '../../models/member'
import { ObjectID } from 'mongodb'
import { yellow, blue, green, red } from '../../logger/'
import app from '../server'
// import { disconnectFromMongo } from '../../db'
import { twoTestMembers } from './test-users'
import { oneTestMember } from './test-users'
import { fillMember } from './member-utils'

beforeAll(() => {
  // console.clear()
  // green('beforeAll')
  // await app.startServer()
  // yellow('app', app())
  // app = await require('../server')
})

beforeEach(async (done) => {
  // green('beforeEach')
  try {
    const a = await Member.remove({})
    yellow('a: Member.remove', a)
    done()
  }
  catch (e) {
    red('ERROR: beforeEach: ', e)
    // done()
  }
})

afterAll(() => {
  // green('afterAll')
  // closeDb()
  // process.exit(0)
})

describe('Some test', () => {
  // yellow('Some test')
  it('should = 1', () => {
    // yellow('*****************************************************')
    expect(1).toBe(1)
  })
})

describe('GET /members', async () => {
  const m = await new Member()
  const member = fillMember(m, oneTestMember[0])
  yellow('*************member*************', member)

  // const doc = await Member.populate(oneTestMember)
  // should get all members
  it('should get all members', (done) => {

    request(app).get('/members').expect(200).expect((res) => {
      yellow('res.body', res.body)
      expect(res.body.members.length).toBe(2)
    }).end(done)
  })
})

describe('POST /members', () => {
  it('should create a new member', (done) => {
    request(app).post('/members')
    .send(twoTestMembers[0])
    .expect(200)
    .expect((res) => {
      expect(res.body.firstName).toBe(twoTestMembers[0].firstName)
    }).end((err, res) => {
      if (err) {
        red(err)
        return done(err)
      }
      Member.find({firstName: twoTestMembers[0].firstName}).then((members) => {
        expect(members.length).toBe(1)
        expect(members[0].firstName).toBe(twoTestMembers[0].firstName)
        done()
      }).catch((e) => {
        console.log(e)
        done()
      })
    })
  })
})
