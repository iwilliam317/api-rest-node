const express = require('express');

const bcrypt = require('bcrypt');

const User = require('../models/user');

// const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/register', async(request, response) => {

    const { name, email } = request.body;

      try{

        if (await User.findOne({ email })){
            return response.status(400).send({ status: 'User already exists!' })
        }

        console.log(request.body);
        const user = await User.create(request.body);
        return response.send({ user });

        } catch (error){
            return response.status(400).send({ status: 'Registration failed!' })
    }
});

router.post('/authenticate', async (request, response) => {
    const { email, password } = request.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user){
        return response.status(400).send({ error: 'User not found' });
    }

    if( !await bcrypt.compare(password, user.password) ){
        return response.status(400).send({ error: 'Password invalid'})
    }

    response.send( {user });

});

//route /auth/register
module.exports = (app) => app.use('/auth', router); 