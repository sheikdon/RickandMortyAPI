///////////////////////////////////////
// Import Dependencies
///////////////////////////////////////
const mongoose = require('./connection')
const Character = require('./character')





///////////////////////////////////////
// Seed Script code
///////////////////////////////////////
// first we need our connection saved to a variable for easy reference
const db = mongoose.connection

db.on('open', () => {
    // bring in the array of startertCharacter
    const startCharacters = [{
        "name": "Rick Sanchez",
        "status": "Alive",
        "species": "Human",
        "gender": "Male",
        "origin": "Earth (C-137)",
        "location": "Citadel of Ricks",
        "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
        },
        {
        "name": "Morty Smith",
        "status": "Alive",
        "species": "Human",
        "gender": "Male",
        "origin": "unknown",
        "location": "Citadel of Ricks",
        "image": "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
        },
        {
        "name": "Summer Smith",
        "status": "Alive",
        "species": "Human",
        "gender": "Female",
        "origin": "Earth (Replacement Dimension)",
        "location": "Earth (Replacement Dimension)",
        "image": "https://rickandmortyapi.com/api/character/avatar/3.jpeg",
        },
        {
        "name": "Beth Smith",
        "status": "Alive",
        "species": "Human",
        "gender": "Female",
        "origin": "Earth (Replacement Dimension)",
        "location": "Earth (Replacement Dimension)",
        "image": "https://rickandmortyapi.com/api/character/avatar/4.jpeg",
        },
        {
        "name": "Jerry Smith",
        "status": "Alive",
        "species": "Human",
        "gender": "Male",
        "origin": "Earth (Replacement Dimension)",
        "location": "Earth (Replacement Dimension)",
        "image": "https://rickandmortyapi.com/api/character/avatar/5.jpeg",
        },
        {
        "name": "Abadango Cluster Princess",
        "status": "Alive",
        "species": "Alien",
        "gender": "Female",
        "origin": "Abadango",
        "location": "Abadango",
        "image": "https://rickandmortyapi.com/api/character/avatar/6.jpeg",
        },
        {
        "name": "Abradolf Lincler",
        "status": "unknown",
        "species": "Human/Genetic experiment",
        "gender": "Male",
        "origin": "Earth (Replacement Dimension)",
        "location": "Testicle Monster Dimension",
        "image": "https://rickandmortyapi.com/api/character/avatar/7.jpeg",
        },
        {
        "name": "Adjudicator Rick",
        "status": "Dead",
        "species": "Human",
        "gender": "Male",
        "origin": "unknown",
        "location": "Citadel of Ricks",
        "image": "https://rickandmortyapi.com/api/character/avatar/8.jpeg",
        },
        {
        "name": "Agency Director",
        "status": "Dead",
        "species": "Human",
        "gender": "Male",
        "origin": "Earth (Replacement Dimension)",
        "location": "Earth (Replacement Dimension)",
        "image": "https://rickandmortyapi.com/api/character/avatar/9.jpeg",
        },
        {
        "name": "Alan Rails",
        "status": "Dead",
        "species": "Superhuman (Ghost trains summoner)",
        "gender": "Male",
        "origin": "unknown",
        "location": "Worldender's lair",
        "image": "https://rickandmortyapi.com/api/character/avatar/10.jpeg",
        },
        {
        "name": "Albert Einstein",
        "status": "Dead",
        "species": "Human",
        "gender": "Male",
        "origin": "Earth (C-137)",
        "location": "Earth (Replacement Dimension)",
        "image": "https://rickandmortyapi.com/api/character/avatar/11.jpeg",
        },
        {
        "name": "Alexander",
        "status": "Dead",
        "species": "Human",
        "gender": "Male",
        "origin": "Earth (C-137)",
        "location": "Anatomy Park",
        "image": "https://rickandmortyapi.com/api/character/avatar/12.jpeg",
        },
        {
        "name": "Alien Googah",
        "status": "unknown",
        "species": "Alien",
        "gender": "unknown",
        "origin": "unknown",
        "location": "Earth (Replacement Dimension)",
        "image": "https://rickandmortyapi.com/api/character/avatar/13.jpeg",
        },
        {
        "name": "Alien Morty",
        "status": "unknown",
        "species": "Alien",
        "gender": "Male",
        "origin": "unknown",
        "location": "Citadel of Ricks",
        "image": "https://rickandmortyapi.com/api/character/avatar/14.jpeg",
        },
        {
        "name": "Alien Rick",
        "status": "unknown",
        "species": "Alien",
        "gender": "Male",
        "origin": "unknown",
        "location": "Citadel of Ricks",
        "image": "https://rickandmortyapi.com/api/character/avatar/15.jpeg",
        },
        {
        "name": "Amish Cyborg",
        "status": "Dead",
        "species": "Alien/Parasite",
        "gender": "Male",
        "origin": "unknown",
        "location": "Earth (Replacement Dimension)",
        "image": "https://rickandmortyapi.com/api/character/avatar/16.jpeg",
        },
        {
        "name": "Annie",
        "status": "Alive",
        "species": "Human",
        "gender": "Female",
        "origin": "Earth (C-137)",
        "location": "Anatomy Park",
        "image": "https://rickandmortyapi.com/api/character/avatar/17.jpeg",
        },
        {
        "name": "Antenna Morty",
        "status": "Alive",
        "species": "Human with antennae",
        "gender": "Male",
        "origin": "unknown",
        "location": "Citadel of Ricks",
        "image": "https://rickandmortyapi.com/api/character/avatar/18.jpeg",
        },
        {
        "id": 19,
        "name": "Antenna Rick",
        "status": "unknown",
        "species": "Human with antennae",
        "gender": "Male",
        "origin": "unknown",
        "location":  "unknown",
        "image": "https://rickandmortyapi.com/api/character/avatar/19.jpeg",
        },
        {
        "name": "Ants in my Eyes Johnson",
        "status": "unknown",
        "species": "Human with ants in his eyes",
        "gender": "Male",
        "origin": "unknown",
        "location": "Interdimensional Cable",
        "image": "https://rickandmortyapi.com/api/character/avatar/20.jpeg",
        }
        ]
        
        

    // delete all the existingtCharacter
    Character.deleteMany({})
        .then(deletedCharacters => {
            console.log('this is what .deleteMany returns', deletedCharacters)

            // create a bunch of newtCharacter from startCharacters
            Character.create(startCharacters)
                .then(data => {
                    console.log('here are the newly created Characters', data)
                    // always close connection to the db
                    db.close()
                })
                .catch(error => {
                    console.log(error)
                    // always close connection to the db
                    db.close()
                })
        })
        .catch(error => {
            console.log(error)
            // always close connection to the db
            db.close()
        })
})