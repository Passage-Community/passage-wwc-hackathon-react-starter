const mongodb = require('mongodb');

let usersCollection;

class UsersDao {
  static injectDBConnection = async (client) => {
    if (usersCollection) {
      return;
    }
    try {
      const usersDB = client.db('phone_a_friend');
      usersCollection = usersDB.collection('users');
    } catch (error) {
      console.error(`Unable to stablish a collection-handles: ${error}`);

      throw new Error('Unable to connect to db');
    }
  };

  static getUser = async (id) => {
    try {
      const objectId = new mongodb.ObjectId(id);

      const user = await usersCollection.findOne({
        _id: objectId
      });

      return user;
    } catch (error) {
      console.error(`Error getUser: ${error.message}`);

      throw new Error('Not possible to find user');
    }
  };

  static addUser = async (request) => {
    try {
      const newUser = await usersCollection.insertOne(request);

      return newUser;
    } catch (error) {
      console.error(`Error addThing: ${error.message}`);

      throw new Error('Not possible to add user');
    }
  };

  static deleteUser = async (id) => {
    try {
      const objectId = new mongodb.ObjectId(id);

      const deleteResult = await usersCollection.deleteOne({ _id: objectId });

      return deleteResult;
    } catch (error) {
      console.error(`Error deleteUser: ${error.message}`);

      throw new Error('Not possible to delete User');
    }
  };
}

module.exports = UsersDao;
