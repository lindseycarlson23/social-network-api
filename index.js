const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
const { MongoClient } = require('mongodb');

const connectionString =
  process.env.MONGODB_URI || 'mongodb+srv://root:root@cluster0.d4jt8qo.mongodb.net/';


const PORT = process.env.PORT || 3001;
const app = express();




app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  });











  
// const client = new MongoClient(connectionString);
// console.log(connectionString);

// const dbName = 'socialNetworkDB';



// async function connectAndOpenDb() {
//     try {
//         await client.connect();
//         console.log('Connection successfuly to MongoDB');
//         db = client.db(dbName);

//         app.listen(PORT, () => {
//             console.log(`API server running on port ${PORT}!`);
//     });
//     }   catch (err) {
//         console.error('Mongo connection error: ', err.message);
//     }  
// }
// connectAndOpenDb();