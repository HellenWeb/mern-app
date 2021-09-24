
// Modules

let User = require('../models/user-model')
let bcrypt = require('bcrypt')
const UserDto = require('../dtos/dto-user')
const tokenService = require('./token-service')
const ApiError = require('../exteptions/api-error')

// Making class "UserService"

class UserService {
    async registration(email, password) {
        let candidate = await User.findOne({ email })
        if (candidate) { throw ApiError.BadRequest(`This email address is already registered`) }
        let hashPassword = await bcrypt.hash(password, 3)
        let user = await User.create({ email, password: hashPassword })
        let userDto = new UserDto(user)
        let token = tokenService.generate({ ...userDto })
        await tokenService.saveToken( userDto.id, token.refreshToken)
        return { ...token, user: userDto }
    }
    async login(email, password) {
        let user = await User.findOne({ email });
        if (!user) {
            throw ApiError.BadRequest('Invalid Email')
        }
        let isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            throw ApiError.BadRequest('Wrong Password')
        }
        let userDto = new UserDto(user)
        let tokens = await tokenService.generate({ ...userDto });
        await tokenService.saveToken( userDto.id, tokens.refreshToken)
        return { ...tokens, user: userDto }
    }
    async logout(refreshToken) {
        let token = await tokenService.removeToken(refreshToken)
        return token;
    }
}

// Exporting for Modules

module.exports = new UserService()