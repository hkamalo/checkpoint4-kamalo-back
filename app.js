const express = require('express');

const app = express();
const server = app.listen(3001);



require('dotenv').config();
require('./socketMessenger')();


// ------------------------- Security ------------------------------------------- //



// security parameters
app.use(express.json());
app.set('x-powered-by', false); // for security
app.set('trust proxy', 1); // trust first proxy

// process setup : improves error reporting
process.on('unhandledRejection', (error) => {
  console.error('unhandledRejection', JSON.stringify(error), error.stack);
});
process.on('uncaughtException', (error) => {
  console.error('uncaughtException', JSON.stringify(error), error.stack);
});


// ------------------------- Server Lunching ------------------------------------------- //





module.exports = server;
