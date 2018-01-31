const mongoose = require('mongoose')

//import related schemas
let City = require('./models/City')
let Specialization = require('./models/Specialization')
let Tag = require('./models/Tag')
let SocialMedia = require('./models/SocialMedia')

//Student Schema
let studentSchema = mongoose.Schema({
    name: {
        type: String
    },
    first_name: {
        type: String
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    student_number: {
        type: String,
        required: true
    },
    picture: {
        type: String
    },
    hometown: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City'
    },
    personal_email: {
        type: String
    },
    bio: {
        type: String
    },
    quote: {
        type: String
    },
    prefferred_regions: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'City'
        }
    ],
    specialization: {
        type: mongoose.Schema.ObjectId,
        ref: 'Specialization'
    },
    tags: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Tag'
        }
    ],
    social_media: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'SocialMedia'
        }
    ]
})


let Student = module.exports = mongoose.model('Student', studentSchema)