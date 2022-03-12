const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const path = require('path');
const http = require('http');

const { typeDefs, resolvers } = require('./schemas');
// Import `authMiddleware()` function to be configured with the Apollo Server
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;

async function startApolloServer() {
  const app = express();
  const httpServer = http.createServer(app);

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  // if we're in production, serve client/build as static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: authMiddleware,
  });

  await server.start();
  server.applyMiddleware({ app });
  await new Promise((resolve, _reject) =>
    httpServer.listen(PORT, () => {
      console.log('🌍 Now listening on localhost ' + PORT);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
      resolve();
    })
  );
}

startApolloServer();

// const express = require('express');
// const { ApolloServer } = require('apollo-server-express');
// const path = require('path');
// const db = require('./config/connection');
// const { authMiddleware } = require('./utils/auth');
// const { typeDefs, resolvers } = require('./schemas');
// const app = express();
// const PORT = process.env.PORT || 3001;

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: authMiddleware,
// });

// async function startApolloServer() {
  
// }

// server.applyMiddleware({ app });

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // if we're in production, serve client/build as static assets
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
// }

// app.use(routes);

// db.once('open', () => {
//   app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
//   console.log(`Use GraphQl at http://localhost:${PORT}${server.graphqlPath}`);
// });
