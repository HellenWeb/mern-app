
// Modules

const router = require('express').Router();
const request = require('../controllers/RequestLog')
const { check } = require("express-validator")

// Create Request

router.post('/signup', [ check('email', 'Invalid Email ').isEmail(), check('password', 'Wrong Password').isLength({ min: 6 }) ], request.requestSignupPage)
router.post('/login', [ check('email', 'Invalid Email ').isEmail().normalizeEmail(), check('password').exists() ], request.requestLoginPage)
router.post('/logout', request.requestLogoutPage)
router.get('/profile/:id')

// Exporting for Modules

module.exports = router
