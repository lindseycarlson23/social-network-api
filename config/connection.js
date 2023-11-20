const { connect, connection, connections } = require('mongoose');

const connectionString =
  process.env.MONGODB_URI || 'mongodb+srv://root:root@cluster0.d4jt8qo.mongodb.net/socialNetworkDb';

connect(connectionString);
console.log(connectionString);

module.exports = connection;