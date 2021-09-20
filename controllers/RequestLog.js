
// Modules

const userService = require("../services/user-service");

// Making class "RequestLog"

class RequestLog {
    async requestSignupPage(req, res, next) {
        try {
            let { email, password } = req.body;
            let userData = await userService.registration(email, password)
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 1000, httpOnly: true })
            return res.json(userData)
        } catch (err) { next(err); }
    }
    async requestLoginPage(req, res, next) {
        try {

        } catch (err) { next(err); }
    }
}

// Expoting for Modules

module.exports = new RequestLog();