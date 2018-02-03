const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')

//DB Config
require('./config/db');

const app = express()
app.use(bodyParser.json())

//app.use(cors())
var corsOptions = {
    origin: ['http://localhost:4000', 'http://localhost:3000'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

Student = require('./models/Student')

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

//Start server
const port = 3000
app.listen(port, () => console.log(`Now listening on localhost:${port}`) )
