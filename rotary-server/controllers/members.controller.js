import Member from '../models/members.model'
import logger from '../core/logger/app-logger'

const controller = {}

controller.getAll = async (req, res) => {
  try {
    const members = await Member.getAll()
    logger.info('sending all members...')
    res.send(members)
  } catch (err) {
    logger.error('Error in getting members- ' + err)
    res.send('Got error in getAll')
  }
}

controller.addMember = async (req, res) => {
  let memberToAdd = Member({firstName: req.body.firstName})
  // console.log('firstName', req.body.firstName)
  console.log('memberToAdd', memberToAdd)
  try {
    const savedMember = await Member.addMember(memberToAdd)
    logger.info('Adding member...')
    res.send('added: ' + savedMember)
  } catch (err) {
    logger.error('Error in adding members- ' + err)
    res.send('Got error in addMember')
  }
}

controller.deleteMember = async (req, res) => {
  let firstName = req.body.firstName
  try {
    const removedMember = await Member.removeMember(firstName)
    logger.info('Deleted Member- ' + removedMember)
    res.send('Member successfully deleted')
  } catch (err) {
    logger.error('Failed to delete member- ' + err)
    res.send('Delete failed..!')
  }
}

export default controller
