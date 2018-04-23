
// import expect from 'expect'
// import request from 'supertest'
import 'babel-polyfill'
import { app, closeDb } from '../server.js'
// import  Member from  '../../models/member'
// import { ObjectID } from 'mongodb'


import { blue, green } from '../../logger/'

beforeAll(() => {
  green('beforeAll')
})

beforeEach(function() {
  green('beforeEach')
  console.log('before every test in every file')
})

afterAll(() => {
  green('afterAll')
  closeDb()
})

describe('Some test', () => {
  it('should = 1', () => {
    expect(1).toBe(1)
  })
})
