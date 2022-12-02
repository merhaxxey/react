const express = require('express')
const router = express.Router()
const {
    createCart,
    getAllCart,
    getSingleCart,
    updateCart,
    deleteCart
} = require('../controllers/cartController')

const {authenticateCartUser} = require('../middleware/authenticateCartUser')

router.route('/')
    .get(authenticateCartUser, getAllCart)
    .post(authenticateCartUser, createCart)
router.route('/:id')
    .get(authenticateCartUser, getSingleCart)
    .patch(authenticateCartUser, updateCart)
    .delete(authenticateCartUser, deleteCart)

module.exports = router