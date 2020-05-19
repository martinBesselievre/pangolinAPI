import { ApplicationError } from '../helpers/errors'

export default (err, req, res, next) => {
  console.log('ERROR')
  console.log(err)
  if (!err.hasOwnProperty('name')) {
    err = new ApplicationError(err.stack || null, 500)
  }
  const error = {'status': 'failure', 'error': err}
  res.status(err.status || 500).send(error)
}
