const express = require('express')
const router = express.Router()
const {
    getAllProducts,
    createProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    similarProduct
} = require('../controllers/productController')
const { authenticateUser, authorizePermission } = require('../middleware/authentication')

router.route('/')
    .get(getAllProducts)
    .post(authenticateUser, authorizePermission('seller'), createProduct)

router.route('/similar/:categoryName')
    .get(similarProduct)

router.route('/:id')
    .get(getSingleProduct)
    .patch(authenticateUser, updateProduct)
    .delete(authenticateUser, deleteProduct)

module.exports = router


