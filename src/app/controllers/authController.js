const express = require('express');

const bcrypt = require('bcrypt');

const User = require('../models/user');

const jwt = require('jsonwebtoken');

const authConfig = require('../../config/auth.json');

const router = express.Router();

const crypto = require('crypto');

const mailer = require('../../modules/mailer');

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
    const { email } = request.body;

    try {
        const user = await User.findOne({ email });

        if(!user)
            return response.status(400).send({ error: 'User not found' });

        const token = crypto.randomBytes(20).toString('hex');

        const now = new Date();
        
        now.setHours(now.getHours() + 1);

        await User.findByIdAndUpdate( user.id, {
            '$set': {
                passwordResetToken: token,
                passwordResetExpires: now,
            }
        });

        mailer.sendEmail({
            to: email,
            from: 'willshinji@gmail.com',
            template: 'auth/forgot_password',
            context: { token}
        }, (error) => {
            if (error) 
                return response.status(400).send({ error : 'Error on sending email, please try again'});
            console.log(error);
            return response.send();
        })
        // console.log(token, now);
    }
    catch (error){
        console.log(error);
        response.status(400).send({ error : 'Error on forgot password, please try again'});
    }
    
});

//route /auth/register
module.exports = (app) => app.use('/auth', router); 