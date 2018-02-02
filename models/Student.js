const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

//import related schemas
let City = require('./City')
let Specialization = require('./Specialization')
let Tag = require('./Tag')
let SocialMedia = require('./SocialMedia')
let Option = require('./Option')

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
        type: mongoose.Schema.ObjectId,
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

//Get students
module.exports.getStudents = function(callback, limit){
    Student.find(callback).limit(limit).populate(['hometown','prefferred_regions','specialization', 'tags','social_media']).populate({
        path: 'specialization',
        populate: {
            path: 'option',
            model: 'Option'
        }
    })
}

//Get student by id
module.exports.getStudentById = function(id, callback){
    Student.findById(id, callback).populate(['hometown','prefferred_regions','specialization','tags','social_media','option']).populate({
        path: 'specialization',
        populate: {
            path: 'option',
            model: 'Option'
        }
    })
}

//Add Student
module.exports.addStudent = function(student, callback){
    Student.create(student, callback)
}

//Update Student
module.exports.updateStudent = function(id, student, options, callback){
    let query = {_id: id}
    let update = {
        name: student.name,
        first_name: student.first_name,
        username: student.username,
        password: student.password,
        student_number: student.student_number,
        picture: student.picture,
        hometown: student.hometown,
        personal_email: student.personal_email,
        bio: student.bio,
        quote: student.quote,
        prefferred_regions: student.prefferred_regions,
        specialization: student.specialization,
        tags: student.tags,
        social_media: student.social_media
    }
    Student.findOneAndUpdate(query, update, options, callback)
}

//remove Student
module.exports.removeStudent = function(id, callback){
    let query = {_id: id}
    Student.remove(query, callback)
}