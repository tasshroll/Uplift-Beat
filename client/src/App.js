// Desc: This is the main app file. It is the first file that is run when the app is started.
import React from 'react';
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
import AppNavbar from './components/navbar';


const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
//console.log("authLink is ", authLink);

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

//console.log("client is ", client);

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <AppNavbar />
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
