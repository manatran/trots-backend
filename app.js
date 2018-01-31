const express = require('express')
const mongoose = require('mongoose')
const path = require('path')


mongoose.connect('mongodb://localhost/trots')
let db = mongoose.connection

//Notify connection to DB
db.once('open', () => {
    console.log('Connected to MongoDB')
})
//Log errors To console
db.on('error', (err) => {
    console.log(err)
})



const app = express()

app.set('public', path.join(__dirname, 'public'))

app.get('/', (req, res) => {
    res.send('hello')
})


//Start server
const port = 3000
app.listen(port, () => console.log(`Now listening on localhost:${port}`))