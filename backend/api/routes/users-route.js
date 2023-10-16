const express = require('express');
const UsersDao = require('../../users-dao');

const router = express.Router();

router
  .route('/')
  .get((req, res) => {
    res.send({ message: 'should return nothing' });
  })
  .post(async (req, res) => {
    const request = req.body;

    const newUserResponse = await UsersDao.addUser(request);
    const id = newUserResponse.insertedId?.toString();

    res.send({ message: 'user created', id });
  });

router.route('/:id').get(async (req, res) => {
  const id = req.params.id;

  const userResponse = await UsersDao.getUser(id);

  res.send({ message: 'user found', data: userResponse });
});

module.exports = router;
