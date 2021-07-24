
const socketIO = require('socket.io');

// Models
const MessagesModel = require('./models/MessagesModel');
const UserModel = require('./models/UserModel');


// helper : take all message from the database
const messagesList = async (senderId, receiverId) => {
  const messages = await MessagesModel.getExhangedMessage(senderId, receiverId);
  return messages;
};


// --------------------------- function to handle the chat --------------------------------- //


function messenger(server) {
  
  // socket cors
  const io = socketIO(server, {
    cors: { origin: ['http://localhost:3000'] },
  });
  
  // instant message send to the client
  const chatMessages = [];

  io.on('connect', (socket) => {
    console.log('user connected');

    // send the profil infos to the client
    socket.on('userConnected', async (userName) => {
      const userData = await UserModel.findUser(userName);
      io.emit('userConnected', userData);
    });

    // get messages list when contact is selected
    socket.on('messagesWithContact', async (userId, contactId) => {
      const exchangedMessages = await messagesList(userId, contactId);
      chatMessages.push(exchangedMessages);
      io.emit('messagesWithContact', chatMessages);
    });

    // handle new message from client side
    socket.on('messageSendByUser', async (NewChatMessage) => {
      const newMessage = {
        ...NewChatMessage,
        sendingDate: new Date().toISOString(),
      };
      // store in the db
      await MessagesModel.storeMessage(newMessage);

      // send back the message to the client
      chatMessages.push(newMessage);
      io.emit('messageSendByUser', chatMessages);
    });

    // handle client leaving
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
}

module.exports = messenger;
