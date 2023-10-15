const express = require('express');
const UsersDao = require('../../users-dao');

const router = express.Router();

router
  .route('/')
  .get((req, res) => {
    res.send({ message: 'should return a user' });
  })
  .post(async (req, res) => {
    const request = req.body;

    const newUserResponse = await UsersDao.addUser(request);
    const id = newUserResponse.insertedId?.toString();

    res.send({ message: 'user created', id });
  });

module.exports = router;
