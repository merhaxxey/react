const express = require('express')
const router = express.Router()
const {
    createOrder,
    getSingleOrder,
    getAllOrder,
    deleteOrder
} = require('../controllers/orderController')
const {authenticateUser} = require('../middleware/authentication')

router.route('/').post(authenticateUser, createOrder)
router.route('/:id').get(getSingleOrder)
router.route('/').get(getAllOrder)
router.route('/:id').post(deleteOrder)

module.exports = router