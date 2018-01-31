const mongoose = require('mongoose')

//import related schemas
let Course = require('./models/Course')
let Student = require('./models/Student')
let Media = require('./models/Media')
let Tag = require('./models/Tag')
let Tool = require('./models/Tool')

//Project Schema
let projectSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    assignment: {
        type: String,
        required: true
    },
    thumbnail_url: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    creators: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Student'
        }
    ],
    media: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Media'
        }
    ],
    tags: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Tag'
        }
    ],
    tools: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Tool'
        }
    ]
})


let Project = module.exports = mongoose.model('Project', projectSchema)