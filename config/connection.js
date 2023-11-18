const { connect, connection } = require('mongoose');

const connectionString =
  process.env.MONGODB_URI || 'mongodb+srv://root:root@cluster0.d4jt8qo.mongodb.net/';

connect(connectionString);

module.exports = connection;