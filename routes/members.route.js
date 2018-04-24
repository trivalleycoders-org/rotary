import express from 'express'
// import memberController from '../controllers/members.controller'
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
    const b = req.body
    // yellow('post:body', b)
    const m = await new Member()
    // yellow('firstName', b.firstName)
    m.firstName = b.firstName
    // yellow('lastName', b.lastName)
    m.lastName = b.lastName
    // yellow('email', b.email)
    m.email = b.email
    // yellow('comments', b.comments)
    b.comments && m.comments.push(...b.comments)
    // yellow('phone', b.phone)
    b.phone && m.phone.push(...b.phone)
    // yellow('rolws', b.avoidRoles)
    b.avoidRoles && m.avoidRoles.push(...b.avoidRoles)
    // yellow('after roles')
    let doc = await m.save()
    res.send(doc)
  } catch (e) {
    red('members.route: post', e)
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
