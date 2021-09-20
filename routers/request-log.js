
// Modules

const router = require('express').Router();
const request = require('../controllers/RequestLog')

// Create Request

router.post('/signup', request.requestSignupPage)
router.post('/login', request.requestLoginPage)
router.post('/logout')
router.get('/profile/:id')

// Exporting for Modules

module.exports = router
