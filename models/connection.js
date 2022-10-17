// make our .env variables available via process.env
require('dotenv').config()
// import mongoose
const mongoose = require('mongoose')

// connect to the database
const DATABASE_URL = process.env.DATABASE_URL
const DEPLOYED_URL = process.env.DEPLOYED_URL
const CONFIG = {
	useUnifiedTopology: true,
	useNewUrlParser: true,
}
mongoose.connect(DEPLOYED_URL, CONFIG)


// save the connection in a variable
const db = mongoose.connection

// create some notification
db.on('open', () => console.log('You are connected to mongo'))
db.on('close', () => console.log('You are disconnected from mongo'))
db.on('error', (error) => console.log(error))

// export the connection
module.exports = mongoose
