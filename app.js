const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);
require('dotenv').config();

// ------------------------- Security ------------------------------------------- //

// security parameters
app.use(express.json());
app.set('x-powered-by', false); // for security
app.set('trust proxy', 1); // trust first proxy

// initRoutes(app);

// process setup : improves error reporting
process.on('unhandledRejection', (error) => {
  console.error('unhandledRejection', JSON.stringify(error), error.stack);
});
process.on('uncaughtException', (error) => {
  console.error('uncaughtException', JSON.stringify(error), error.stack);
});


// ------------------------- Server Lunching ------------------------------------------- //

const {PORT} = process.env;

// init server
app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

server.listen(PORT, () => {
  console.log('listening on *: ',PORT);
});

module.exports = server;
