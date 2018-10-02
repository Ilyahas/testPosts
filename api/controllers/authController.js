const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config');

async function signupUser(req, res, next) {
    const userCredentials = req.body;
    bcrypt.hash(userCredentials.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({error: err});
        } else {
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                username: userCredentials.username,
                passwordHash: hash
            });
            user.save()
                .then((result) => {
                    res.status(200).json({message: 'User created'});
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({error: err});
                });
        }
    })
}

async function signinUser(req, res, next) {
    const userCredentials = req.body;
    User.findOne({username: userCredentials.username})
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Auth failed'
                })
            }
            bcrypt.compare(userCredentials.password, user.passwordHash, (err, result) => {
               if (err) {
                   return res.status(500).json({ message: 'Auth failed' });
               }
               if (result) {
                   const token = jwt.sign({
                       username: user.username,
                       userId: user._id
                   }, config.secret, {
                       expiresIn: '1h'
                   });
                   return res.status(200).json({
                       message: 'Auth successful',
                       token: token
                   });
               }
                return res.status(401).json({
                    message: 'Auth failed'
                })
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
}

module.exports = {
    signupUser,
    signinUser
};