const express = require('express');

const app = express();
const server = app.listen(3001);
app.use(express.json());

require('./routes')(app);

require('dotenv').config();
require('./socketMessenger')(server);


// ------------------------- Security ------------------------------------------- //



// security parameters
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
