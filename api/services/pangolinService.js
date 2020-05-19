import Pangolin from '../models/pangolin'
import Contact from '../models/contact'
import { ObjectNotFoundError, AuthenticationFailedError } from '../helpers/errors'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const get_pangolin = (id) => {
  return Pangolin.findById(id).then((pangolin) => {
    if (!pangolin) {
      throw new ObjectNotFoundError('Pangolin', id)
    }
    return pangolin
  })
}

const list_pangolins = () => {
  return Pangolin.find({}).then((pangolins) => {
    return pangolins
  })
}

const create_pangolin = (pangolin) => {
  	return pangolin.save().then(() => {
      const status = {'status': 'success'}
    	return status
  	})
}

const update_pangolin = (pangolin) => {
  const pangolinId = pangolin.id
  const data = {
    name: pangolin.name,
    password: pangolin.password,
    family: pangolin.family,
    race: pangolin.race,
    age: pangolin.age,
    food: pangolin.food,
    lat: pangolin.lat,
    lng: pangolin.lng,
  }
  return Pangolin.findByIdAndUpdate(pangolin.id, data, { new: true }).then((pangolin) => {
    if (!pangolin) {
      throw new ObjectNotFoundError('Pangolin', pangolinId)
    }
    return pangolin.update().then(() => {
      const status = {'status': 'success'}
      return status
    })
  })
}

const delete_pangolin = (id) => {
  return Pangolin.findById(id).then((pangolin) => {
    if (!pangolin) {
      throw new ObjectNotFoundError('Pangolin', id)
    }
    return Contact.remove({pangolin_id: id}).then((result) => {
      return Pangolin.remove({_id: id}).then((result)=> {
        const status = {'status': 'success'}
        return status
      })
    })
  })
}

module.exports = {
  get_pangolin,
  list_pangolins,
  create_pangolin,
  update_pangolin,
  delete_pangolin
}