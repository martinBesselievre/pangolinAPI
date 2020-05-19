import defaultRoute from './_default'
import errorHandler from '../middlewares/error-handler'
import pangolinRoutes from './pangolinRoutes'
import contactRoutes from './contactRoutes'
import authRoutes from './authRoutes'

export default (app) => {
  app.use('/api/v0', [
  	authRoutes,
    pangolinRoutes,
    contactRoutes
  ])
  app.use(errorHandler)
  app.use(defaultRoute)
}