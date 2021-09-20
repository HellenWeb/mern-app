
// Modules

let jwt = require('jsonwebtoken')
let tokenModel = require('../models/token-model')

// Making class "TokenService"

class TokenService {
    generate(payload) {
        let acsessToken = jwt.sign(payload, '' + process.env.SECRET_ACSESS_TOKEN, {
            expiresIn: '1h'
        })
        let refreshToken = jwt.sign(payload, '' + process.env.SECRET_REFRESH_TOKEN, {
            expiresIn: '30d'
        })
        return { acsessToken, refreshToken }
    }
    async saveToken(userId, refreshToken) {
        let tokenData = await tokenModel.create({ user: userId, refreshToken })
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        let token = tokenModel.create({ user: userId, refreshToken })
        return token;
    }
}

// Exporting For module

module.exports = new TokenService()