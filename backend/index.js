const mongodb = require('mongodb');
const dotenv = require('dotenv');
const app = require('./server.js');
const UsersDao = require('./users-dao.js');

dotenv.config();

const MongoClient = mongodb.MongoClient;
const mongo_username = process.env['DB_USER'];
const mongo_pwd = process.env['DB_PASSWORD'];

const uri = `mongodb+srv://${mongo_username}:${mongo_pwd}@cluster0.if0zlcq.mongodb.net/?retryWrites=true&w=majority`;

const PORT = 7001;

MongoClient.connect(uri, {
  maxPoolSize: 10,
  writeConcern: { wtimeoutMS: 2500 }
})
  .catch((err) => {
    console.error('Mongo connection error: ', err.stack);
    process.exit(1);
  })
  .then(async (mongoClient) => {
    await UsersDao.injectDBConnection(mongoClient);

    app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`);
    });
  });
