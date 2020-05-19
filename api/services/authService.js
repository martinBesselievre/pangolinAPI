import Pangolin from '../models/pangolin'
import { ObjectNotFoundError, AuthenticationFailedError, DuplicateKeyError } from '../helpers/errors'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


const JWT_SECRET = 'ThisIsMySecret'
const JWT_VALIDITY = '1h'

const login = (name, password) => {
  return Pangolin.findOne({ name: name}).then((pangolin) => {
    if (!pangolin) {
      throw new AuthenticationFailedError('Pangolin', name)
    }
    if (pangolin && bcrypt.compareSync(password, pangolin.password)) {
      const payload = {'name': pangolin.name }
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_VALIDITY })
      const result = {'pangolin': {'id': pangolin.id, 'name': pangolin.name, 'lat': pangolin.lat, 'lng': pangolin.lng, 'access_token': token, 'expires_in': JWT_VALIDITY}}
      return result
    }
    else {
      throw new AuthenticationFailedError('Pangolin', name)
    } 
  })
}

const register = (pangolin) => {
  console.log(pangolin)
  pangolin.password = bcrypt.hashSync(pangolin.password, 10);
  return pangolin.save().then((pangolin) => {
    const payload = { 'name': pangolin.name }
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_VALIDITY })
    const result = {'pangolin': {'id': pangolin.id, 'name': pangolin.name, 'lat': pangolin.lat, 'lng': pangolin.lng, 'access_token': token, 'expires_in': JWT_VALIDITY}}
    return result
  }, (error) => {
    throw new DuplicateKeyError('Pangolin', error.keyValue.name)
  })
}

module.exports = {
  login,
  register
}