// Main server file for the application
require("dotenv").config();
const express = require('express');
const path = require('path');
const db = require('./config/connection');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const cors = require('cors');
// seed the database
const {seedNews} = require('./utils/API');

// Apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});
// port and app
const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}
// routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// start server and connect to db
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', async () => {
    
    // seed the database with news articles from GNews API for the current day
    //console.log("In server.js - calling seedNews");
    await seedNews();

    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
};

// start the server
startApolloServer(typeDefs, resolvers); 

