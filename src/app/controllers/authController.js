const express = require('express');

const bcrypt = require('bcrypt');

const User = require('../models/user');

const jwt = require('jsonwebtoken');

const authConfig = require('../../config/auth.json');

const router = express.Router();


function generateToken(params = {}){
    return jwt.sign({ params }, authConfig.secret, {
        expiresIn: 84600
    });
}

router.post('/register', async(request, response) => {

    const { name, email } = request.body;

      try{

        if (await User.findOne({ email })){
            return response.status(400).send({ status: 'User already exists!' })
        }

        console.log(request.body);
        const user = await User.create(request.body);
        return response.send({
         user,
         token: generateToken( { id: user.id })  
        });

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
        return response.status(400).send({ error: 'Invalid password!'})
    }

    response.send( {
        user,
        token: generateToken( { id: user.id }) 
    });

});

router.post('/forgot_password', async (request, response) => {
    response.send({ ok: true });
});

//route /auth/register
module.exports = (app) => app.use('/auth', router); 