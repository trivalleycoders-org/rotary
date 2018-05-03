import express from 'express'
const router = express.Router()
import Member from '../models/member'
import { isValidObjectID } from '../db/utils'
import { red, blue, yellow } from '../logger'

router.get('/', async (req, res) => {
  try {
    let members = await Member.find()
    res.send({members})
  } catch (e) {
    res.status(400).send(e)
  }
})

router.get('/:id', async (req, res) => {
  const id = req.params.id
  if (!isValidObjectID(id)) {
    return res.status(404).send()
  }
  try {
    let member = await Member.findById(id)
    if (!member) {
      return res.status(404).send()
    }
    res.send(member)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.post('/', async (req, res) => {
  try {
    const members = req.body
    let membersToAdd
    // blue('members.length', members.length)
    if (Array.isArray(members)) {
      membersToAdd = members
    } else {
      membersToAdd = [members]
    }
    const membersAdded = await Promise.all(membersToAdd.map(async (m) => {
      // blue('m', m)
      let nm = new Member()
      nm.firstName = m.firstName
      nm.lastName = m.lastName
      nm.email = m.email
      m.comments && nm.comments.push(...m.comments)
      m.phone && nm.phone.push(...m.phone)
      m.avoidRoles && nm.avoidRoles.push(...m.avoidRoles)
      // blue('nm', nm)
      let doc = await nm.save()
      // blue('doc', doc)
      return nm
    }))

    // blue('BEFORE SEND: membersAdded.length', membersAdded)
    res.send(membersAdded)
  } catch (e) {
    // red('members.route: post', e)
    res.status(400).send(e)
  }
})

router.delete('/:id', async (req, res) => {
  const id = req.params.id
  if (!isValidObjectID(id)) {
    return res.status(404).send()
  }
  try {
    let member = await Member.findByIdAndRemove(id)
    if (!member) {
      return res.status(404).send()
    }
    res.send({member})
  } catch (e) {
    res.status(400).send()
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const id = req.params.id
    if (!isValidObjectID(id)) {
      return res.status(404).send()
    }
    const body = req.body
    const member = await Member.findByIdAndUpdate(id, { $set: body }, { new: true })

    if (!member) {
      return res.status(404).send()
    }
    res.send(member)
  } catch (e) {
    res.status(400).send()
  }

})


export default router
