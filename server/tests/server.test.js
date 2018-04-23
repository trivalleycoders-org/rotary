
// import expect from 'expect'
// import request from 'supertest'
import 'babel-polyfill'
import app from '../server.js'
// import  Member from  '../../models/member'
// import { ObjectID } from 'mongodb'


// import { blue, green } from '../../log/'

console.log('test')

beforeEach(function() {
  console.log('before every test in every file')
})

describe('Some test', () => {
  it('should = 1', () => {
    expect(1).toBe(1)
  })
})
