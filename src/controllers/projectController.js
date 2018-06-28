const router = require('express').Router();
const authMiddleware = require('../middlewares/auth.js');

const Project = require('../models/Project');
const Task = require('../models/Task');

router.use(authMiddleware);

router.get('/', async (request, response) => {
  response.send({ user: request.userId});
});

router.get('/:projectId', async (request, response) => {
  response.send({ user: request.userId});
});

router.post('/', async (request, response) => {
  response.send({ user: request.userId});
});

router.put('/:projectId', async (request, response) => {
  response.send({ user: request.userId});
});

router.delete('/:projectId', async (request, response) => {
  response.send({ user: request.userId});
});





module.exports = app => app.use('/projects', router);

