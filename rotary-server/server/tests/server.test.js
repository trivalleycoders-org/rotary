const expect = require('expect')
const request = require('supertest')
const { Member } = require('../../models/member')

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
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos)
  }).then(() => done())
})

describe('GET /members', () => {
  it('should get all members', (done) => {
    request(app).get('/todos').expect(200).expect((res) => {
      expect(res.body.todos.length).toBe(2)
    }).end(done)
  })
})
