
// Modules

const { Schema, Types, model } = require('mongoose')

// Making Schema User

let schemaUser = new Schema({
    email: { type: String, required: true, unique: true, },
    password: { type: String, required: true},
})

// Exporting for module

module.exports = model('User', schemaUser)