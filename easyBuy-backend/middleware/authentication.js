const Token = require("../model/Token")
const { isTokenValid, attachCookiesToResponse } = require("../utils")
const CustomError = require('../errors')

const authenticateUser = async(req, res, next)=>{
    const {refreshToken, accessToken} = req.signedCookies

    if(accessToken){
        const payload = isTokenValid(accessToken)
        req.user = {...payload.user}
        return next()
    }
    if(!refreshToken){
        throw new CustomError.BadRequestError('Invalid credentials')
    }
    const payload = isTokenValid(refreshToken)
    console.log(payload)

    const existingToken = await Token.findOne({
        user: payload.user.userId,
        refreshToken:payload.refreshToken
    })
    
    if(!existingToken ){
        throw new CustomError.UnauthenticatedError('Authentication invalid')
    }

    attachCookiesToResponse({res, user:payload.user, refreshToken:existingToken.refreshToken})
    req.user = {...payload.user, refreshToken:payload.refreshToken}
    next()
}

const authorizePermission = (...roles)=>{
    return (req, res, next)=>{
        if(!roles.includes(req.user.role)){
            throw new CustomError.UnauthorizedError('Unauthorized to access this route')
        }
        next()
    }
}
module.exports = {
    authenticateUser,
    authorizePermission
}