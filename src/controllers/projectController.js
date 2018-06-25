const router = require('express').Router();
const authMiddleware = require('../middlewares/auth.js');


router.use(authMiddleware);

router.get('/', (request, response) => {
  response.send({ ok: true});
});

module.exports = app => app.use('/projects', router);

