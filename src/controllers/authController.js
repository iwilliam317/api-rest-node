const express = require('express');

const User = require('../models/user');

const router = express.Router();

router.post('/register', async(request, response) => {

    const { name } = request.body;
    console.log(name)
      try{

        if (await User.findOne({ email })){
            return response.status(400).send({ status: 'User already exists!' })
        }

        const user = await User.create(request.body);
        return response.send({ user });

        } catch (error){
            return response.status(400).send({ status: 'Registration failed!' })
    }
});

//route /auth/register
module.exports = (app) => app.use('/auth', router); 