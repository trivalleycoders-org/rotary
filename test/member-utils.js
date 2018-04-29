import 'babel-polyfill'
import { yellow, blue, green, red } from '../logger/'
import {ObjectID} from 'mongodb'
import Member from '../models/member'
// import Mongoose from 'mongoose'


// Mongoose.Promise = global.Promise


// import {yellow, blue, green, red, greenf} from '../logger/'

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
    const firstName = `First-${num}`
    const lastName = `Last-${num}`
    const email = `${firstName}@${lastName}.com`
    const phone = {
      phoneType: 'Mobile',
      phoneNumber: `${num}${num}${num}-${num}${num}${num}-${num}${num}${num}${num}`
    }
    const user = {
      _id: new ObjectID(),
      firstName,
      lastName,
      comments: [`comment 1 (${num})`, `comment 2 (${num})`],
      email,
      phone,
    }
    users.push(user)
  }

  // console.log('users', users)
  return users
}
export const insertMembers = async (num) => {
  try {
    const users = makeUsers(num)
    let result = await Member.insertMany(users)
    console.log('result', result)
  }
  catch (e) {
    console.log('ERROR inserting members', e)
  }
}



export default { fillMember, insertMembers }
