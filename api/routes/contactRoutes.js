import express from 'express'
import { validateToken } from '../middlewares/token-validator'
import contactController from '../controllers/contactController'

const router = express.Router()

// contact_list
router
	.route('/pangolins/:pangolin_id/contacts')
	.get(validateToken, contactController.list_contacts)
  
// add_contact
router
  .route("/pangolins/:pangolin_id/contacts")
  .post(validateToken, contactController.create_contact)

//remove_contact
router
  .route("/pangolins/:pangolin_id/contacts/:contact_id")
  .delete(validateToken, contactController.delete_contact)

module.exports = router
