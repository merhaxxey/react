const mongoose = require('mongoose')

const SingleOrderSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    }, 
    image:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    product:{
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: true
    }
})

const OrderSchema = mongoose.Schema({
    shippingFee:{
        type: Number,
        required: true
    },
    subtotal:{
        type: Number,
        required: true
    },
    total:{
        type: Number,
        required: true
    },
    orderItems: [SingleOrderSchema],
    status: {
        type: String,
        enum: ['pending', 'failed', 'paid', 'delivered', 'canceled'],
        default: 'pending'
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    clientSecret:{
        type: String,
        required: true
    },
    paymentReference:{
        type: String
    }
}, {timestamps: true})

module.exports = mongoose.model('Order', OrderSchema)