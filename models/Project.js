const mongoose = require('mongoose')

//import related schemas
let Course = require('./Course')
let Lecturer = require('./Lecturer')
let Student = require('./Student')
let Media = require('./Media')
let Tag = require('./Tag')
let Tool = require('./Tool')

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

//Get projects
module.exports.getProjects = function(callback, limit){
    Project.find(callback).limit(limit).populate(['courses', 'creators', 'media', 'tags', 'tools']).populate({
        path: 'course',
        populate: {
            path: 'lecturer',
            model: 'Lecturer'
        }
    }).populate({
        path: 'creators',
        populate: {
            path: 'specialization',
            model: 'Specialization',
            populate: {
                path: 'option',
                model: 'Option'
            }
        }
    })
}

//Get project by id
module.exports.getProjectById = function(id, callback){
    Project.findById(id, callback).populate(['courses', 'creators', 'media', 'tags', 'tools']).populate({
        path: 'course',
        populate: {
            path: 'lecturer',
            model: 'Lecturer'
        }
    }).populate({
        path: 'creators',
        populate: {
            path: 'specialization',
            model: 'Specialization',
            populate: {
                path: 'option',
                model: 'Option'
            }
        }
    })
}

//Add Project
module.exports.addProject = function(project, callback){
    Project.create(project, callback)
}

//Update Project
module.exports.updateProject = function(id, project, options, callback){
    let query = {_id: id}
    let update = {
        name: project.name,
        first_name: project.first_name,
        username: project.username,
        password: project.password,
        project_number: project.projectt_number,
        picture: project.picture,
        hometown: project.hometown,
        personal_email: project.personal_email,
        bio: project.bio,
        quote: project.quote,
        prefferred_regions: project.prefferred_regions,
        specialization: project.specialization,
        tags: project.tags,
        social_media: project.social_media
    }
    Project.findOneAndUpdate(query, update, options, callback)
}

//remove Project
module.exports.removeProject = function(id, callback){
    let query = {_id: id}
    Project.remove(query, callback)
}