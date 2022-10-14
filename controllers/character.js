////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express")
const Character = require("../models/character")

/////////////////////////////////////////
// Create Router
/////////////////////////////////////////
const router = express.Router()

/////////////////////////////////////////////
// Routes
////////////////////////////////////////////
// GET request
// index route -> shows all instances of a document in the db
router.get("/", (req, res) => {
    // console.log("this is the request", req)
    // in our index route, we want to use mongoose model methods to get our data
    Character.find({})
        .populate("comments.author", "username")
        .then(characters => {
            const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId
            // here, we're going to render a page, but we can also send data that we got from the database to that liquid page for rendering
            res.render('characters/index', { characters, username, loggedIn, userId })
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})


// for searach

router.get('/characters/?', (req, res) => {
	console.log(req.body.params)
	Character.find({name:{$eq: req.body.params}})
		.then(characters => {
			console.log(characters)
			const username = req.session.username
			const loggedIn = req.session.loggedIn
			const userId = req.session.userId

			res.redirect(`/characters/${characters[0].id}`)
		})
		.catch(err => res.redirect(`/error?error=${err}`))
})  



// GET for new 
// renders the form to create a 
router.get('/new', (req, res) => {
    const username = req.session.username
    const loggedIn = req.session.loggedIn
    const userId = req.session.userId

    res.render('characters/new', { username, loggedIn, userId })
})

// POST request
// create route -> gives the ability to create new 
router.post("/", (req, res) => {
    // here, we'll get something called a request body
    // inside this function, that will be referred to as req.body
    // this is going to add ownership, via a foreign key reference, to our 
    // basically, all we have to do, is append our request body, with the `owner` field, and set the value to the logged in user's id
    req.body.owner = req.session.userId
    console.log('the characters from the form', req.body)
    // we'll use the mongoose model method `create` to make a new 
    Character.create(req.body)
        .then(character => {
            const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId
            
            res.redirect('/characters')
           
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})

// GET request
// only  owned by logged in user
// we're going to build another route, that is owner specific, to list all the  owned by a certain(logged in) user
router.get('/mine', (req, res) => {
    // find the , by ownership
    Character.find({ owner: req.session.userId })
    // then display the 
        .then(characters => {
            const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId

            
            res.render('characters/index', { characters, username, loggedIn, userId })
        })
    // or throw an error if there is one
        .catch(err => res.redirect(`/error?error=${err}`))
})

// GET request to show the update page
router.get("/edit/:id", (req, res) => {
    const username = req.session.username
    const loggedIn = req.session.loggedIn
    const userId = req.session.userId

    const characterId = req.params.id

    Character.findById(characterId)
        // render the edit form if there is a 
        .then(character => {
            res.render('characters/edit', { character, username, loggedIn, userId })
        })
        // redirect if there isn't
        .catch(err => {
            res.redirect(`/error?error=${err}`)
        })
    // res.send('edit page')
})

// PUT request
// update route -> updates a specific 
router.put("/:id", (req, res) => {
    console.log("req.body initially", req.body)
    const id = req.params.id
    Character.findById(id)
        .then(character => {
            if (character.owner == req.session.userId) {
                // must return the results of this query
                return character.updateOne(req.body)
            } else {
                res.sendStatus(401)
            }
        })
        .then(() => {
            // console.log('returned from update promise', data)
            res.redirect(`/characters/${id}`)
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})






router.delete('/:id', (req, res) => {
    // get the fruit id
    const characterId = req.params.id

    // delete and REDIRECT
    Character.findByIdAndRemove(characterId)
        .then(character => {
            // if the delete is successful, send the user back to the index page
            res.redirect('/characters')
        })
        .catch(err => {
            res.redirect(`/error?error=${err}`)
        })
})

// SHOW request
// read route -> finds and displays a single resource
router.get("/:id", (req, res) => {
    const id = req.params.id

    Character.findById(id)
        // populate will provide more data about the document that is in the specified collection
        // the first arg is the field to populate
        // the second can specify which parts to keep or which to remove
        // .populate("owner", "username")
        // we can also populate fields of our subdocuments
        .populate("comments.author", "username")
        .then(character => {
            console.log(character)
            const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId
            res.render('characters/show', { character, username, loggedIn, userId })
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router