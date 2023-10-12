# Uplift-Beat
Get the latest uplifting news on current events happening around the world with just a click. This app provides articles from many news sources in the areas of Technology, Business, World news, entertainment, health, and science. Stay informed and uplifted with up-to-date top headlines on topics that interest you the most.

# Description
Full-stack MERN app that allows users to explore and read good, uplifting articles. Users must sign in i they are new to the app and provide their username, email and password. If they already have an account, then they must login to have the feature to save or remove articles in their account. Users are further motivated with a carousel of quotes from famous people. Uplift-Beat app is a performant and scalable multi-page application that fulfills a real-world need, with a focus on data and user demand.

The front end features React and it is styled using React Bootstrap and custom CSS within each JavaScript page. The client utilizes the following queries and mutations:

    Queries: 
    GET_ME, 
    GET_NEWS  
    
    Mutations: 
    LOGIN_USER, 
    ADD_USER, 
    SAVE_ARTICLE, 
    REMOVE_ARTICLE

    
JSON Web Token (JWT) securely transmits username, email and password as a JSON object. This information can be verified and trusted because it is digitally signed. Authentication middleware works in the context of a GraphQL API.
    
The back retrieves recent articles from the RESTful API, Google News. https://gnews.io/. News and User Data are stored in a MongoDB database. The database interfaces to Apollo GraphQL built with Apollo Server. Node.js/Express.js powers the server and API. Apollo Server uses resolvers to handle the front end queries and mutations to interact with data in the database. 

[![License](https://img.shields.io/badge/License-n/a-n/a.svg)](n/a)

# Git Hub Repository

https://github.com/tasshroll/Uplift-Beat

# Deployed Application

https://uplift-beat-1ed3f823ed28.herokuapp.com/

# Screenshot

<img src="./client/build/images/Uplift_Beat.png" alt="New" width ="500">

# Installation

 Run the application by clicking: https://uplift-beat-1ed3f823ed28.herokuapp.com/

 ```
https://uplift-beat-1ed3f823ed28.herokuapp.com/

 ```

# Development

On the command line in development type:

```
run npm i 

```
which will install all the dependencies specified in package.json file

Some dependencies are:

    npm i react-router
    npm i dot-env
    npm i react-router-dom
    npm i @apollo/client
    npm i react-bootstrrap
    npm i fade-effect
    npm i react

    "npm run develop" will concurrently start the client and server

# Author
Tifni Shroll is sole author of Uplift_Beat. The original concept was from a group project called "Jolly Journal". Collaborators on Jolly Journal were: 
Ethan Daniel Small
Mubarak Abdulkadir
Mario Inzuna

Questions: Contact tasshrollj@gmail.com

## Usage

 User is prompted to Login/Signup. Once an account is made, user can save and remove articles from their account.

 Future implementations: Allow users to "like" articles, allow users to comment on articles, allow users to search for additional articles by input on topic or keyword
