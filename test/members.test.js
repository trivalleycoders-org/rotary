// import expect from 'expect'
import 'babel-polyfill'
import request from 'supertest'
import {expect} from 'chai'
import {ObjectID} from 'mongodb'
import Member from '../models/member'
import app from '../server/server'
import {twoTestMembers} from './test-users'
import {oneTestMember} from './test-users'
import {fillMember, insertMembers, getMembers, clearMembers } from './member-utils'
import Mongoose from 'mongoose'


Mongoose.Promise = global.Promise

require('dotenv').config()
// tmp-start
import {yellow, blue, green, red, greenf} from '../logger/'
// tmp-end

const util = require('util')
const setTimeoutPromise = util.promisify(setTimeout)

before((done) => {
  // yellow('BEFORE')
  Mongoose.connect(process.env.MONGODB_URI).then(() => {
    greenf('Mongoose connection: ', 'connected')
    done()
  })
})

after(async () => {
  await Mongoose.connection.close().then(() => {
    greenf('Mongoose connection: ', 'closed')
  })
  if (!process.env.WATCH) {
    setTimeoutPromise(1900).then((value) => {
      process.exit(0)
    })
  }
})

describe('members test - start', () => {
  describe('GET /members', async () => {
    // Setup
    before(async () => {
      await clearMembers()
      await insertMembers(2)
    })
    it('should get all members', (done) => {
      request(app).get('/members').expect(200).expect((res) => {
        expect(res.body.members.length).to.equal(2)
      }).end(done)
    })
  })

  describe('POST /members', async () => {
    let members
    before(async () => {
      await clearMembers()
      members = await getMembers(2)
      // yellow('members', members)
    })
    it('should insert 2 members', async () => {

      const res = await request(app).post('/members').send(members)
      expect(200)
      // yellow('res', res.body)
      expect(res.body.length).to.equal(2)
    })
    it('POST /members: should return bad request')
    it('POST /members: should return request not found')
  })



})


// it('should insert 2 members', async () => {
//   request(app).post('/members').send(await getMembers(1)).expect(200).expect((res) => {
//     yellow('res', res.body)
//     expect(res.body.members.length).to.equal(2)
//   })
// })

// it('should get correct firstName', (done) => {
//   request(app).post('/members').send(twoTestMembers[0]).expect(200).expect((res) => {
//     expect(res.body.firstName).to.equal(twoTestMembers[0].firstName)
//   }).end((err, res) => {
//     if (err) {
//       red(err)
//       return done(err)
//     }
//     Member.find({firstName: twoTestMembers[0].firstName}).then((members) => {
//       expect(members.length).to.equal(1)
//       expect(members[0].firstName).to.equal(twoTestMembers[0].firstName)
//       done()
//     }).catch((e) => {
//       console.log(e)
//       done()
//     })
//   })
// })
