const express = require('express');

const User = require('../models/user');

const router = express.Router();

router.post('/register', async(request, response) => {
      try{
        const user = await User.create(request.body);
        return response.send({ user });

        } catch (error){
            return response.status(400).send({ status: 'Registration failed!' })
    }
})

//route /auth/register
module.exports = (app) => app.use('/auth', router); 