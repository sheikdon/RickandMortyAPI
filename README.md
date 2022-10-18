# RickandMorts Wiki
<p align="center">  
This is a basic Fullstack application that shows [Rick and Morty](https://rickandmortyapi.com/) characters and their details, based on mvvm architecture.
</p>
<p align="center">
	
![rick-morty](https://user-images.githubusercontent.com/104471453/196479790-248a3c79-63c7-4aee-bdbc-b6ad617562ea.png)

</p>
### Website Link: https://ricksandmortswiki.fly.dev/
* feel free to add more character and discuss on the VR1 wiki!

### The Objective of this Fullstack App is to display information of the current characters in the database for Rick and Morty. You will be able to search and create the desired characters.

### Summary

### Welcome to the RickandMorts Wiki! This web site allow you to view and add new RickandMorts to the wiki server. You can view the characters as a guest user and simply click on one of the characters to get information on that character (name, status, species and etc).

### Create an account to allow you to add your own RickandMorts, where you can add in the new character that you want, or if you are already a user with us login back in to edit the characters you have added to in the past and add new characters that you haven't made yet.

### When in your own RickandMorts characters, you will be able to add/edit information such as schema you made and a comments section to discuss about your character.

### API EndPoints:
```
| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/signup`              | `users#signup`    |
| POST   | `/login`               | `users#login`     |
| GET    | `/logout               | `user#logout      |
| DELETE | `/characters/id:`      | `users#delete`    |
| GET    | `/:id/edit`            | `user#edit`       |
| PUT    | `/:id                  | `user#update`     |
| GET    | `/new`                 | `user#newform`    |
| GET    | `/`                    | `#index`          |
| GET    | `/mine`                | `user#index`      |
| GET    | `/:id`                 | `user#characters` |
```

### Technologies used:
```
 HTML5, CSS, Javascript, Back-end code, and MongoDB
 "bcryptjs": "^2.4.3",
    "bootstrap-icons": "^1.9.1",
    "connect-mongo": "^4.6.0",
    "dotenv": "^16.0.0",
    "express": "^4.17.3",
    "express-session": "^1.17.2",
    "liquid-express-views": "^1.0.8",
    "method-override": "^3.0.0",
    "mongoose": "^6.2.4",
    "morgan": "^1.10.0"
 ```

 ### Models:
 ```
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
 ```

### As a user I want to be able to...
```
### - sign up with a username and password
### - log in with the username and password
### - log out
### - search for a characters by name
### - read the info on a character
### - log a character I see remove a log from a character 
### - I see add comments to a character I see
```
### Timeline of Project:
```
### - Monday: get idea verified and ask questions to make sure I can make a functional API App.
### - Tuesday: Start the back-end code and get the route folders done. This also may included th controllers.
### - Wednesday: Get the backend code and make sure the API works.
### - Thursday: start the Liquid and work on the clickable routes
## - Friday: Finish up the liquid and make a functional regardless how ugly the site is.
### - The Weekend: Decorate and add new ideas to the website and finish any missing work I have.
```
### ERD
![ERD](photos/ERD.png)

### Display
![Image1](photos/Image1.png)
![Image@](photos/Image@.png)
![Image3](photos/Image3.png)
![Comment](photos/Comment.png)
![Image2](photos/Image2.png)
