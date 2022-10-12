////////////////////
//  Dependencies  //
////////////////////
require("dotenv").config() // make env variables available
const express = require("express")
// const path = require("path") // import path module
const CharacterRouter = require('./controllers/character')
const UserRouter = require('./controllers/user')
const CommentRouter = require('./controllers/comment')
const middleware = require('./utils/middleware')
// SEE MORE DEPENDENCIES IN ./utils/middleware.js
// user and resource routes linked in ./utils/middleware.js

//////////////////////////////
// Middleware + App Object  //
//////////////////////////////
const app = require("liquid-express-views")(express())

middleware(app)

/////////////////////////////////////////////
// Home Route
/////////////////////////////////////////////
app.get("/", (req, res) => {
    // res.send("Your server is running, better go out and catch it")
    // you can also send html as a string from res.send
    // res.send("<small style='color: red'>Your server is running, better go out and catch it</small>")
    res.render('index.liquid')
})

////////////////////
//    Routes      //
////////////////////

app.use('/auth', UserRouter)
app.use('/characters', CharacterRouter)
app.use('/comments', CommentRouter)
// app.get('/auth', (req, res) => {
//     const { username, userId, loggedIn } = req.session
// 	res.render('index.liquid', { loggedIn, username, userId })
// })

app.get('/auth', (req, res) => {
	const error = req.query.error || 'This Page Does Not Exist'
    const { username, loggedIn, userId } = req.session
	res.render('error.liquid', { error, username, loggedIn, userId })
})

// if page is not found, send to error page
app.all('*', (req, res) => {
	res.redirect('/error')
})



//////////////////////////////
//      App Listener        //
//////////////////////////////
app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})