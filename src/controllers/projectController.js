const router = require('express').Router();


router.get('/', (request, response) => {
  response.send('ok');
});

module.exports = app => app.use('/projects', router);

