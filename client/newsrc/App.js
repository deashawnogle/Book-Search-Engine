import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
// import Home from './pages/Home';
// import Signup from './pages/Signup';
// import Login from './pages/Login';
// import SingleThought from './pages/SingleThought';
// import Profile from './pages/Profile';
// import Header from './components/Header';
// import Footer from './components/Footer';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
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

function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      hi
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
         {/*  <Header />
          <div className="container">
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/me">
              <Profile />
            </Route>
            <Route exact path="/profiles/:username">
              <Profile />
            </Route>
            <Route exact path="/thoughts/:thoughtId">
              <SingleThought />
            </Route>
          </div>
          <Footer /> */}
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;



// import React from 'react';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import SearchBooks from './pages/SearchBooks';
// import SavedBooks from './pages/SavedBooks';
// import Navbar from './components/Navbar';
// import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client';
// import { setContext } from '@apollo/client/link/context';

//  // Construct our main GraphQL API endpoint
// const httpLink = createHttpLink({
//   uri: '/graphql',
// });

// // Construct request middleware that will attach the JWT token to every request as an `authorization` header
// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = localStorage.getItem('id_token');
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : '',
//     },
//   };
// });

// const client = new ApolloClient({
//   // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
// });


// function App() {
//   return (
//     <ApolloProvider client={client}>
//     <Router>
//       <>
//         <Navbar />
//           <Route exact path='/'  >

//             <SearchBooks/>
//           </Route>
//           <Route exact path='/saved' component={SavedBooks} />
//           <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        
//       </>
//      </Router>
//    </ApolloProvider>
//   );
// }

// export default App;
