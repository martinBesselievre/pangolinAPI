import express from 'express'

const router = express.Router()
router.get('/', (req, res) => res.status(200).send('I\'m fine.'))

router.all('*', (req, res) => {
	return res.status(404).send({ 'status': 404, 'message': 'invalid url'+ req.url })
})
module.exports = router