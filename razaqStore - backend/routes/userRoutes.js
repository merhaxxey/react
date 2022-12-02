const express = require('express')
const router = express.Router()
const {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    getUserWithEmail
} = require('../controllers/userController')
const {authenticateUser, authorizePermission} = require('../middleware/authentication')

router.route('/').get(authenticateUser, authorizePermission('admin'), getAllUsers)
router.route('/showMe').get(authenticateUser, showCurrentUser)
router.route('/updateUser').patch(authenticateUser, updateUser)
router.route('/email/:email').get(getUserWithEmail)

router.route('/:id').get(authenticateUser, getSingleUser)


module.exports = router