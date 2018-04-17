import express from 'express'
// import memberController from '../controllers/members.controller'
const router = express.Router()
import Member from '../models/member'
import { isValidObjectID } from '../db/utils'
// import { red, blue } from '../log'

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
  const member = await new Member({firstName: req.body.firstName})
  try {
    let doc = await member.save()
    res.send(doc)
  } catch (e) {
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
  const id = req.params.id
  const body = req.body
  blue('body', body)


  // red('id', id)
  if (!isValidObjectID(id)) {
    return res.status(404).send()
  }

  try {
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
