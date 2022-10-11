////////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////////
const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

////////////////////////////////////////////
// Create router
////////////////////////////////////////////
const router = express.Router()


// Routes

// GET to render the signup form
router.get('/signup', (req, res) => {
	res.render('auth/signup')
})

// POST route for sign up
// talks to the database, gets data from the signup form, creates a new user if possible
router.post('/signup', async (req, res) => {
    // this route will receive a req.body
    console.log('this is our initial req.body', req.body)
    // first step, is to encrypt our password
    req.body.password = await bcrypt.hash(
        req.body.password,
        await bcrypt.genSalt(10)
    )
    console.log('req.body after hash', req.body)

    // create a new user
    User.create(req.body)
        // if successful, console log the user(for now)
        .then(user => {
            console.log(user)
            // res.status(201).json({ username: user.username})
            res.redirect('/auth/login')
        })
        // if an error occurs, log the error
        .catch(err => {
            console.log(err)
            // res.json(err)
            res.redirect(`/error?error=${err}`)
        })
})

// GET route for logging in
// renders a page with a signup form
router.get('/login', (req, res) => {
    res.render('auth/login')
})

// POST route for logging in
// receives user credentials and creates a session
router.post('/login', async (req, res) => {
    // get our data from the req body, saved as separate variables
    const { username, password } = req.body

    // search the db for a user with that username
    User.findOne({ username })
        .then(async (user) => {
            // check if they exist
            if (user) {
                // compare the password
                // bcrypt.compare -> evals to a truthy or a falsy
                const result = await bcrypt.compare(password, user.password)

                if (result) {
                    // this is where we use the session object
                    // session object lives in our request
                    req.session.username = username
                    req.session.loggedIn = true
                    req.session.userId = user.id 

                    console.log('this is req.session', req.session) 

                    // we'll send a 201 status and the user as json for now
                    // we'll change this later for security purposes
                    // res.status(201).json({ user: user.toObject() })
                    res.redirect('/characters')
                } else {
                    // res.json({ error: 'username or password incorrect' })
                    res.redirect(`/error?error=username%20or%20password%20incorrect`)
                }
            } else {
                // send an error message
                // res.json({ error: 'user does not exist' })
                res.redirect(`/error?error=user%20does%20not%20exist`)
            }
        })
        .catch(err => {
            // instead of res.json, we'll redirect to the error page
            // and we'll pass the error to a req.query, which is anything after a ?
            // res.json(err)
            res.redirect(`/error?error=${err}`)
        })
})

// GET
// SENDS to the logout page
router.get('/logout', (req, res) => {
    const username = req.session.username
    const loggedIn = req.session.loggedIn
    const userId = req.session.userId

    res.render('auth/logout', { username, loggedIn, userId})
})

// DELETE -> runs the logout
// /users/logout
// a route for log out 
router.delete('/logout', (req, res) => {
    // destroy the session(eventually we'll redirect)
    req.session.destroy(err => {
        console.log('req.session after logout', req.session)
        console.log('err on logout?', err)

        // res.sendStatus(204)
        res.redirect('/')
    })
})

// Export the Router
module.exports = router
