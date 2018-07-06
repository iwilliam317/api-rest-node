const router = require('express').Router();
const authMiddleware = require('../middlewares/auth.js');

const Project = require('../models/project');
const Task = require('../models/task');

router.use(authMiddleware);

router.get('/', async (request, response) => {
  // console.log(request.userId);
  try{
    const projects = await Project.find().populate('user');

    return response.send({ projects });
  }
  catch (error){
    return response.status(400).send({ error: 'Error loading projects!'});
  }
  
});

router.get('/:projectId', async (request, response) => {
  try {
    const project = await Project.findById(request.params.projectId).populate('user');

    return response.send({ project });
  }
  catch (error){
    return response.status(400).send({ error: 'Error loading project!'});
  }
});

router.post('/', async (request, response) => {
  try{
    const { title, description, tasks } = request.body;

    const project = await Project.create({title, description, user: request.userId });

    await Promise.all( tasks.map(async task => {
      const projectTask = new Task({ ...task, project: project._id });

      await projectTask.save();
      project.tasks.push(projectTask);
    }));

    await project.save();

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
  try {
   await Project.findByIdAndRemove(request.params.projectId);

    return response.send('Project successfuly deleted!');
  }
  catch (error){
    return response.status(400).send({ error: 'Error deleting project!'});
  }
});





module.exports = app => app.use('/projects', router);

