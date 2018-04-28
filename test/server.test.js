
// import expect from 'expect'
import 'babel-polyfill'
import request from 'supertest'
import { expect } from 'chai'
// var expect = require('chai').expect
import { ObjectID } from 'mongodb'
import  Member from  '../models/member'
import app from '../server/server'
import { twoTestMembers } from './test-users'
import { oneTestMember } from './test-users'
import { fillMember } from './member-utils'
// tmp
import { yellow, blue, green, red } from '../logger/'


before(() => {
  // await app.startServer()
  // app = await require('../server')
})

beforeEach(async () => {
  // green('beforeEach')
  try {
    const a = await Member.remove({})
    yellow('a: Member.remove', a)
    // done()
  }
  catch (e) {
    red('ERROR: beforeEach: ', e)
    // done()
  }
})

after(() => {
  // process.exit(0)
})

describe('Some test', () => {
  it('should = 1', () => {
    // expect(1).to.equal(1)
    expect('some test').to.be.a('string');
  })
})

describe('GET /members', async () => {
  const m = await new Member()
  const member = fillMember(m, oneTestMember[0])

  // should get all members
  it('should get all members', (done) => {
    request(app).get('/members').expect(200).expect((res) => {
      yellow('res.body', res.body)
      expect(res.body.members.length).to.equal(2)
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
