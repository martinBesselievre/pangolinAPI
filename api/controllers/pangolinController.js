import pangolinService from '../services/pangolinService'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import Pangolin from '../models/pangolin'

const list_pangolins = (req, res, next) => {
  pangolinService.list_pangolins().
  then((pangolins) => {
    return res.status(200).send(pangolins)
  }).
  catch(error => next(error))
}

const get_pangolin = (req, res, next) => {
  const pangolinId = req.params.id
  pangolinService.get_pangolin(pangolinId).
  then((pangolin) => {
    return res.status(200).send(pangolin)
  }).
  catch(error => next(error))
}

const update_pangolin = (req, res, next) => {
  let toUpdate = {
  	id: req.params.id,
    name: req.body.name,
    family: req.body.family,
    race: req.body.race,
    age: req.body.age,
    food: req.body.food,
    lat: req.body.lat,
    lng: req.body.lng
  }
  if (req.body.password) {
      pangolin.password = bcrypt.hashSync(req.body.password, 10);
  }
  pangolinService.update_pangolin(toUpdate).
  then((status) => {
    const message = {'status': status.status, 'message': 'Pangolin successfully updated'}
    return res.status(200).send(message)
  }).
  catch(error => next(error))
}

const delete_pangolin = (req, res, next) => {
  const pangolinId = req.params.id
  pangolinService.delete_pangolin(pangolinId).
  then((result) => {
    const message = {'status': result.status, 'message': 'Pangolin successfully deleted'}
    return res.status(200).send(message)
  }).
  catch(error => next(error))
}

module.exports = {
  get_pangolin,
  list_pangolins,
  update_pangolin, 
  delete_pangolin
}
