import mongoose from 'mongoose'

// const memberSchema = mongoose.Schema({
//     firstName: String,
//
// })
//
// let Member = mongoose.model('Member', memberSchema)

let roleSchema = new mongoose.Schema({
  roleId: String,
  notPreferred: {
    type: Boolean,
    default: false,
  }
})

let phoneSchema = new mongoose.Schema({
  phoneType: {
    type: String,
    enum: ['Home', 'Work', 'Mobile']
  },
  phoneNumber: {
    type: String
  }

})

const memberSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  comments: {
    type: [String]
  },
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  exempt: {
    type: Boolean,
    default: false
  },
    phone: [phoneSchema],
    roles: [roleSchema]
})

let Member = mongoose.model('Member', memberSchema)

Member.getAll = () => {
  return Member.find({})
}

Member.addMember = (memberToAdd) => {
  return Member.save()
}

Member.removeMember = (firstName) => {
  return Member.remove({firstName: firstName})
}

export default Member
