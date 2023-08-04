// import React from 'react';
// import UncontrolledExample from './UncontrolledExample';

// function App() {
//   return (
//     <div>
//       <UncontrolledExample />
//     </div>
//   );
// }

// export default App;

import React from 'react';
<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { 
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client'; 

import { setContext } from '@apollo/client/link/context'; 
import DisplayArticles from './pages/DisplayArticles';
import SavedArticles from './pages/SavedArticles';
import navbar from './components/navbar';


// Construct main GraphQL API endpoint
const httpLink = createHttpLink({ 
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT 
// token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({ 
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
=======
import SearchArticles from './pages/SearchArticles';
import SavedArticles from './pages/SavedArticles';
import Navbar from './components/navbar.js';
>>>>>>> 3b7ced02a7b719e4792bc68f12b6c6863b01caf9

function App() {
  return (
    <ApolloProvider client={client}> 
      <Router>
        <>
          <navbar />
          <Routes>
            <Route
              path='/'
              element={<DisplayArticles />}
            />
            <Route
              path='/saved'
              element={<SavedArticles />}
            />
            <Route
              path='*'
              element={<h1 className='display-2'>Wrong page!</h1>}
            />
          </Routes>

        </>
      </Router>
    </ApolloProvider> 
  );
}

export default App;
