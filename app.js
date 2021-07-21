const express = require('express');
const socketIO = require('socket.io');

const uniqid = require('uniqid');

const app = express();
const server = app.listen(3001);
require('dotenv').config();

// ------------------------- Security ------------------------------------------- //

// socket cors

const io = socketIO(server, {
  cors: { origin:['http://localhost:3000'] }
});

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

// eslint-disable-next-line no-unused-vars
const messages = [
  { id: uniqid(), author: 'server', text: 'welcome to WildChat' },
 ];
 
 io.on('connect', (socket) => {
  console.log('user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});



module.exports = server;
