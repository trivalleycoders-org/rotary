import mongoose from 'mongoose'

// const memberSchema = mongoose.Schema({
//     firstName: String,
//
// })
//
// let Member = mongoose.model('Member', memberSchema)

let Member = mongoose.model('Member', {
    firstName: {
        type: String
    }
})

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
