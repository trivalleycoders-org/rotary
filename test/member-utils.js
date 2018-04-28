import { yellow, blue, green, red } from '../logger/'

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

export default { fillMember }
