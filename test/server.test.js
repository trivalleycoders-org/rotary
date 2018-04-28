// import expect from 'expect'
import 'babel-polyfill'
import request from 'supertest'
import {expect} from 'chai'
import {ObjectID} from 'mongodb'
import Member from '../models/member'
import app from '../server/server'
import {twoTestMembers} from './test-users'
import {oneTestMember} from './test-users'
import {fillMember} from './member-utils'
import {connectToMongo} from '../db'
import {dropCollection} from '../db'
import Mongoose from 'mongoose'
require('dotenv').config()
// tmp-start
import {yellow, blue, green, red, greenf} from '../logger/'
// tmp-end

const util = require('util')
const setTimeoutPromise = util.promisify(setTimeout)

before((done) => {
  Mongoose.connect(process.env.MONGODB_URI).then((conn) => {
    greenf('connected to mongo')
    done()
  })
})
beforeEach(async () => {

  // try {
  //   const a = await Member.remove({})
  //   yellow('a: Member.remove', a)
  // }
  // catch (e) {
  //   red('ERROR: beforeEach: ', e)
  // }
})
after(() => {
  if (!process.env.WATCH) {
    setTimeoutPromise(1900).then((value) => {
      yellow('exit')
      process.exit(0)
    })
  }
})

describe('Some test', () => {
  it('should = 1', () => {
    expect('some test').to.be.a('string')
  })
})

describe.skip('GET /members', async () => {
  const m = await new Member()
  const member = fillMember(m, oneTestMember[0])

  // should get all members
  it.skip('should get all members', (done) => {
    request(app).get('/members').expect(200).expect((res) => {

      expect(res.body.members.length).to.equal(2)
    }).end(done)
  })
})

describe ('Remove all members', async () => {
  it('should return zero members', async () => {
    const a = await Member.remove({})
    const b = await Member.find({})
    expect(b.length).to.equal(0)
  })
})

describe('POST /members', async () => {
  //
  try {
    const a = await Member.remove({})
    yellow('a: Member.remove', a)
  }
  catch (e) {
    red('ERROR: beforeEach: ', e)
  }
  //
  it('should create a new member', (done) => {
    request(app).post('/members').send(twoTestMembers[0]).expect(200).expect((res) => {
      expect(res.body.firstName).to.equal(twoTestMembers[0].firstName)
    }).end((err, res) => {
      if (err) {
        red(err)
        return done(err)
      }
      Member.find({firstName: twoTestMembers[0].firstName}).then((members) => {
        expect(members.length).to.equal(1)
        expect(members[0].firstName).to.equal(twoTestMembers[0].firstName)
        done()
      }).catch((e) => {
        console.log(e)
        done()
      })
    })
  })
})
