class ApplicationError extends Error {
  constructor (message, status, name) {
    super()
    Error.captureStackTrace(this, this.constructor)
    this.name = name || this.constructor.name
    this.message = message || 'Something went wrong. Please try again.'
    this.status = status || 500
  }
}

class NotFoundError extends ApplicationError {
  constructor (message) {
    super(message || 'Not found', 404, NotFoundError.name)
  }
}

class ObjectNotFoundError extends ApplicationError {
  constructor (objectType, objectId) {
    super(`Object ${objectType}(${objectId}) is not found`, 404, ObjectNotFoundError.name)
  }
}

class AuthenticationFailedError extends ApplicationError {
  constructor (message) {
    super(message || 'Authentication failed', 401, AuthenticationFailedError.name)
  }
}

class AuthorizationRequiredError extends ApplicationError {
  constructor (message) {
    super(message || 'Authorization required', 401, AuthorizationRequiredError.name)
  }
}

class DuplicateKeyError extends ApplicationError {
  constructor (message) {
    super(message || 'Duplicate key', 400, DuplicateKeyError.name)
  }
}

module.exports = {
  ApplicationError,
  NotFoundError,
  ObjectNotFoundError,
  AuthenticationFailedError,
  AuthorizationRequiredError,
  DuplicateKeyError
}
