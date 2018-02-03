const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')

//DB Config
require('./config/db');

const app = express()
app.use(bodyParser.json())

var corsOptions = {
    origin: ['http://localhost:4000', 'http://localhost:3000'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

Student = require('./models/Student')
Project = require('./models/Project')

app.get('/', (req, res) => {
    res.send('hello backend')
})
//Get students
app.get('/api/students', cors(corsOptions), (req, res) => {
    Student.getStudents(function(err, students){
        if(err){
            throw err
        }
        res.json(students)
    })
})
//Get student by id
app.get('/api/students/:_id', cors(corsOptions), (req, res) => {
    Student.getStudentById(req.params._id ,function(err, student){
        if(err){
            throw err
        }
        res.json(student)
    })
})

//Add students
app.post('/api/students', cors(corsOptions), (req, res) => {
    let student = req.body
    Student.addStudent(student, function(err, student){
        if(err){
            throw err
        }
        res.json(student)
    })
})

//Update students
app.put('/api/students/:_id', cors(corsOptions), (req, res) => {
    let id = req.params._id
    let student = req.body
    Student.updateStudent(id, student, {}, function(err, student){
        if(err){
            throw err
        }
        res.json(student)
    })
})

//Remove student
app.delete('/api/students/:_id', cors(corsOptions), (req, res) => {
    let id = req.params._id
    Student.removeStudent(id, function(err, student){
        if(err){
            throw err
        }
        res.json(student)
    })
})



//Get projects
app.get('/api/projects', cors(corsOptions), (req, res) => {
    Project.getProjects(function(err, projects){
        if(err){
            throw err
        }
        res.json(projects)
    })
})
//Get project by id
app.get('/api/projects/:_id', cors(corsOptions), (req, res) => {
    Project.getProjectById(req.params._id ,function(err, project){
        if(err){
            throw err
        }
        res.json(project)
    })
})

//Add projects
app.post('/api/projects', cors(corsOptions), (req, res) => {
    let project = req.body
    Project.addProject(project, function(err, project){
        if(err){
            throw err
        }
        res.json(project)
    })
})

//Update projects
app.put('/api/projects/:_id', cors(corsOptions), (req, res) => {
    let id = req.params._id
    let project = req.body
    Project.updateProject(id, project, {}, function(err, project){
        if(err){
            throw err
        }
        res.json(project)
    })
})

//Remove project
app.delete('/api/projects/:_id', cors(corsOptions), (req, res) => {
    let id = req.params._id
    Project.removeProject(id, function(err, project){
        if(err){
            throw err
        }
        res.json(project)
    })
})

//Start server
const port = 3000
app.listen(port, () => console.log(`Now listening on localhost:${port}`) )
