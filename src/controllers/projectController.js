const router = require('express').Router();
const authMiddleware = require('../middlewares/auth.js');

const Project = require('../models/project');
const Task = require('../models/task');

router.use(authMiddleware);

router.get('/', async (request, response) => {
  // console.log(request.userId);
  try{
    const projects = await Project.find();

    return response.send({ projects });
  }
  catch (error){
    return response.status(400).send({ error: 'Error loading projects!'});
  }
  
});

router.get('/:projectId', async (request, response) => {
  response.send({ user: request.userId});
});

router.post('/', async (request, response) => {
  try{
    const project = await Project.create({...request.body, user: request.userId });

    return response.send({ project });
  }
  catch (error){
    return response.status(400).send({ error: 'Error creating project!'});
  }
  response.send({ user: request.userId});
});

router.put('/:projectId', async (request, response) => {
  response.send({ user: request.userId});
});

router.delete('/:projectId', async (request, response) => {
  response.send({ user: request.userId});
});





module.exports = app => app.use('/projects', router);

