// import dependencies
const mongoose = require('./connection')

// import user model for populate
const User = require('./user')
const commentSchema = require('./comment')

// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose


const characterSchema = new Schema(
	{
		name: { type: String, required: true },
		status: { type: String, required: true },
        species: { type: String, required: true },
		gender: { type: String, required: true },
		origin: { type: String, required: true },
		location: { type: String, required: true },
		image: {type: String, required: true},

		owner: {
			type: Schema.Types.ObjectID,
			ref: 'User',
		},
		comments: [commentSchema]
	},
	{ timestamps: true }
)


const Character = model('Character', characterSchema)

/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = Character
