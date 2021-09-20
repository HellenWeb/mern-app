
// Modules

let User = require('../models/user-model')
let bcrypt = require('bcrypt')
const UserDto = require('../dtos/dto-user')
const tokenService = require('./token-service')

// Making class "UserService"

class UserService {
    async registration(email, password) {
        let candidate = await User.findOne({ email })
        if (candidate) { throw new Error(`User with email ${candidate} already exits`) }
        let hashPassword = await bcrypt.hash(password, 3)
        let user = await User.create({ email, password: hashPassword })
        let userDto = new UserDto(user)
        let token = tokenService.generate({ ...userDto })
        await tokenService.saveToken( userDto.id, token.refreshToken)
        return { ...token, user: userDto }
    }
}

// Exporting for Modules

module.exports = new UserService()