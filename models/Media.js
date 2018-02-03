const mongoose = require('mongoose')

//Media Schema
let mediaSchema = mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})


let Media = module.exports = mongoose.model('Media', mediaSchema)