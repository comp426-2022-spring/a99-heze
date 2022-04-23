// require Express.js
const express = require('express')
const app = express()
// require morgan and fs
const morgan = require('morgan')
const fs = require('fs')
// require database script file
// const logdb = require('./src/services/database.js')
const surveydb = require('./src/services/database.js')
const logdb = require('./src/services/logdb.js')

const cors = require('cors')
app.use(cors())

// helper functions
const helper = require('./src/utils/util.js')

// Default: 5000
const args = require('minimist')(process.argv.slice(2))
const port = args.port || process.env.PORT || 5000
// start app server
const server = app.listen(port, () => {
  console.log('App listening on port %PORT%'.replace('%PORT%', port))
})

// server static HTML files
app.use(express.static('./public'))
// Allow JSON body messages on all endpoints
app.use(express.json())
// Allow URL encoded body messages on all endpoints
app.use(express.urlencoded({extended: true }))

app.use((req, res, next) => {
  let logdata = {
    remoteaddr: req.ip,
    remoteuser: req.user,
    time: Date.now(),
    method: req.method,
    url: req.url,
    protocol: req.protocol,
    httpversion: req.httpVersion,
    status: res.statusCode,
    referer: req.headers['referer'],
    useragent: req.headers['user-agent']
  }
  const stmt = logdb.prepare('INSERT INTO accesslog (remoteaddr, remoteuser, time, method, url, protocol, httpversion, status, referer, useragent) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
  const info = stmt.run(logdata.remoteaddr, logdata.remoteuser, logdata.time, logdata.method, logdata.url, logdata.protocol, logdata.httpversion, logdata.status, logdata.referer, logdata.useragent)
  
  next()
})
//Define base endpoint
app.get('/app/', (req, res) => {
  res.statusCode=200 //respond with status 200
  res.statusMessage='OK' //respond with status message "OK"
  res.writeHead(res.statusCode, {'Content-Type' : 'text/plain'})
  res.end(res.statusCode + ' ' + res.statusMessage)
})

// add new user
app.post('/app/new/user', (req, res, next) => {
  let data = {
  user: req.body.username,
  pass: req.body.password,
  email: req.body.email
  }
  const stmt = logdb.prepare('INSERT INTO userinfo (username, password, email) VALUES (?, ?, ?)')
  const info = stmt.run(data.user, data.pass, data.email)
  next()
  res.status(200).json(info)
})

//delete a single user
app.delete('/app/delete/user', (req, res) => {
  const stmt = logdb.prepare('DELETE FROM userinfo WHERE email = ?')
  const info = stmt.run(req.body.delete_user)
  res.status(200).json()
})

// backend for asking questions
app.post('/app/survey', (req, res, next) => {
  let data = {
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      height: req.body.height,
      age: req.body.age,
      sleep: req.body.sleep,
      mood: req.body.mood,
      energy: req.body.energy,
      symptoms: req.body.symptoms
  }

  const stmt = surveydb.prepare('INSERT INTO surveyinfo (firstname, lastname, email, height, age, sleep, mood, energy, symptoms) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)')
  const info = stmt.run(data.fname, data.lname, data.email, data.height, data.age, data.sleep, data.mood, data.energy, data.symptoms)
  res.status(200).json({'fname': data.fname, 'lname': data.lname, 'email': data.email, 'height': data.height, 'age': data.age, 'sleep': data.sleep, 'mood': data.mood, 'energy': data.energy, 'symptoms': data.symptoms})
})

app.get('/app/results', (req, res, next) => {
  const stmt = surveydb.prepare('SELECT * FROM surveyinfo ORDER BY id DESC LIMIT 1').get()
  var rec_water = helper.water(stmt.age)
  var rec_sleep = helper.sleep(stmt.age)
  var result = {'fname': stmt.firstname, 'lname': stmt.lastname, 'rwater': rec_water, 'rsleep': rec_sleep, 'sleep': stmt.sleep}
  res.status(200).json(result)
})

//default response for any other request
app.use(function(req, res) {
  res.status(404).send('404 NOT FOUND')
})
















