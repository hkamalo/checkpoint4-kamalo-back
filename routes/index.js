const loginRouter = require('./login');

module.exports = (app) => {
  app.use('/login', loginRouter)};