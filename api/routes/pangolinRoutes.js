import express from 'express'
import { validateToken } from '../middlewares/token-validator'
import pangolinController from '../controllers/pangolinController'

const router = express.Router()

// pangolin_list
router
	.route('/pangolins')
	.get(pangolinController.list_pangolins)

// pangolin_get
router
  .route("/pangolins/:id")
  .get(validateToken, pangolinController.get_pangolin)

// pangolin_update
router
  .route("/pangolins/:id")
  .put(validateToken, pangolinController.update_pangolin)

// pangolin_delete
router
  .route("/pangolins/:id")
  .delete(validateToken, pangolinController.delete_pangolin)

module.exports = router
