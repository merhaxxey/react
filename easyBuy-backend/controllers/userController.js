const User = require('../model/User')
const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors')

const getAllUsers = async(req, res)=>{
    const users = await User.find({})
    res.status(StatusCodes.OK).json({count: users.length, users})
}
const getSingleUser = async(req, res)=>{
    const {id} = req.params

    
    const user = await User.findOne({_id:id})
    if(!user){
        throw new CustomError.NotFoundError(`No user found with id - ${id}`)
    }

    checkPermission(req.user, user._id)

    res.status(StatusCodes.OK).json({user})
}
const showCurrentUser = async(req, res)=>{
    const user = await User.findOne({_id:req.user.userId})
    if(!user){
        throw new CustomError.NotFoundError('No user found')
    }

    res.status(StatusCodes.OK).json({user: req.user})
}
const updateUser = async(req, res)=>{
    const {name, email} = req.body
    const user = await User.findOneAndUpdate({_id: req.user.userId}, {name, email}, {
        new: true,
        runValidators: true
    })
    if(!user){
        throw new CustomError.NotFoundError('No account found')
    }
    
    res.status(StatusCodes.OK).json({user})
}

module.exports = {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser
}