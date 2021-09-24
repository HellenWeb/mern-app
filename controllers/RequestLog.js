
// Modules

const userService = require("../services/user-service");
const ApiError = require("../exteptions/api-error")
const { validationResult } = require('express-validator')
const ApiErr = require("../exteptions/api-error")

// Making class "RequestLog"

class RequestLog {
    async requestSignupPage(req, res, next) {
        try {
            let error = validationResult(req)
            if (!error.isEmpty()) { next(ApiErr.BadRequest('Validate Error', error.array())) }
            let { email, password } = req.body;
            let userData = await userService.registration(email, password)
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 1000, httpOnly: true })
            return res.json(userData)
        } catch (err) { next(err); }
    }
    async requestLoginPage(req, res, next) {
        try {
            let { email, password } = req.body;
            let userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 1000, httpOnly: true })
            return res.json(userData)
        } catch (err) { next(err); }
    }
    async requestLogoutPage(req, res, next) {
        try {
            let { refreshToken } = req.cookies;
            let token = userService.logout(refreshToken);
            res.clearCookie('refreshToken')
            return res.json(token)
        } catch (err) { next(err); }
    }
}

// Expoting for Modules

module.exports = new RequestLog();