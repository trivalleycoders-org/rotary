import 'babel-polyfill'
import { yellow, blue, green, red } from '../logger/'
import { ObjectID } from 'mongodb'
import Member from '../models/member'

export const fillMember = (model, data) => {
  let m = model
  const d = data
  m.firstName = d.firstName
  m.lastName = d.lastName
  m.email = d.email
  d.comments && m.comments.push(...d.comments)
  d.phone && m.phone.push(...d.phone)
  d.avoidRoles && m.avoidRoles.push(...d.avoidRoles)
  return m
}

const makeUsers = (num) => {
  let users = []
  for (let i=0; i<num; i++) {
    let firstName = `First-${i}`
    let lastName = `Last-${i}`
    let email = `${firstName}@${lastName}.com`
    let phone = {
      phoneType: 'Mobile',
      phoneNumber: `${i}${i}${i}-${i}${i}${i}-${i}${i}${i}${i}`
    }
    let user = {
      _id: new ObjectID(),
      firstName,
      lastName,
      comments: [`comment 1 (${i})`, `comment 2 (${i})`],
      email,
      phone,
    }
    users.push(user)
  }
  return users
}

export const insertMembers = async (num) => {
  try {
    const users = await makeUsers(num)
    let result = await Member.insertMany(users)
  }
  catch (e) {
    console.log('ERROR inserting members', e)
  }
}

export const getMembers = async (num) => {
  try {
    return makeUsers(num)

  }
  catch (e) {
    console.log('ERROR inserting members', e)
  }
}

export const clearMembers = async () => {
  try {
    const a = await Member.remove({})
  }
  catch (e) {
    red('ERROR: beforeEach: ', e)
  }
}

export default { fillMember, insertMembers, getMembers, clearMembers }
