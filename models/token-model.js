
// Modules

const { Schema, Types, model } = require('mongoose')

// Making Schema Token

let schemaToken = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    refreshToken: { type: String, required: true}
})

// Exporting for Modules

module.exports = model('Token', schemaToken)