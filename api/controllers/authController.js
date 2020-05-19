import authService from '../services/authService'
import Pangolin from '../models/pangolin'
import bcrypt from 'bcryptjs'

const login = (req, res, next) => {
  authService.login(req.body.name, req.body.password).
  then((result) => {
    return res.status(200).send(result)
  }).
  catch(error => next(error))
}

const register = (req, res, next) => {
  let pangolin = Pangolin({
    name: req.body.name,
    password: req.body.password,
    family: req.body.family,
    race: req.body.race,
    age: req.body.age,
    food: req.body.food,
    lat: req.body.lat,
    lng: req.body.lng
  });
  authService.register(pangolin).
  then((result) => {
    return res.status(200).send(result)
  }).
  catch(error => next(error))
}

module.exports = {
  login,
  register
}
