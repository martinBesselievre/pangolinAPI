import { AuthorizationRequiredError } from '../helpers/errors'
import JWT_SECRET from '../constants/jwt'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const validateToken = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      throw new AuthorizationRequiredError()
    }
    try {
      // Extract token from authorization header (Bearer <token>)
      const token = authHeader.split(' ')[1] 
      // Verify that the token has has been issued by us
      const payload = jwt.verify(token, 'ThisIsMySecret')
      console.log(payload)
       // Pass the decoded token to the request object
      req.user = payload
      next()
    } catch (err) {
      console.log(err)
      next({
        ...err,
        status: 401
      })
    }
}

module.exports = {
	validateToken
}
