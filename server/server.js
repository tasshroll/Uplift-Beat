require("dotenv").config()
const express = require('express');
const path = require('path');
const db = require('./config/connection');
const { ApolloServer } = require('apollo-server-express'); 
const { typeDefs, resolvers } = require('./schemas'); 
const { authMiddleware } = require('./utils/auth'); 
const cors = require('cors');

const server = new ApolloServer({ 
  typeDefs,
  resolvers,
  // Pass function authMiddleware to resolverrs so context is made available
  // to all resolvers to access the user data if the user is logged in
  context: authMiddleware, 
});
const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());

// apply middleware to our server to encode url data and json data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(require("./routes"))

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// rooute for handling client-side requests for the index.html file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Create new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => { 
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log (`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  })
})
};

// Start the Apollo server
startApolloServer(typeDefs, resolvers); 