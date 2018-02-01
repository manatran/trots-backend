const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

Student = require('./models/Student')

//Connect to database
mongoose.connect('mongodb://localhost/trots')
let db = mongoose.connection

//Notify connection to DB
db.once('open', () => { console.log('Connected to MongoDB') })
//Log errors To console
db.on('error', (err) => { console.log("Cannot connect to MongoDB", err) })



app.get('/', (req, res) => {
    res.send('hello backend')
})

//Get students
app.get('/api/students', (req, res) => {
    Student.getStudents(function(err, students){
        if(err){
            throw err
        }
        res.json(students)
    })
})
//Get student by id
app.get('/api/students/:_id', (req, res) => {
    Student.getStudentById(req.params._id ,function(err, student){
        if(err){
            throw err
        }
        res.json(student)
    })
})

//Add students
app.post('/api/students', (req, res) => {
    let student = req.body
    Student.addStudent(student, function(err, student){
        if(err){
            throw err
        }
        res.json(student)
    })
})

//Update students
app.put('/api/students/:_id', (req, res) => {
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
app.delete('/api/students/:_id', (req, res) => {
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
