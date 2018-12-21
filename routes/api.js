const Users = require('../models/users.js');
const Exercises = require('../models/exercises.js');

const router = require('express').Router();

router.post('/new-user', (req, res, next) =>{
    const user = new Users(req.body);

    user.save((err, savedUser) =>{
        if (err){
            if (err.code  == 11000){
                //uniqueness error
                return next({
                    status: 400,
                    message: 'username already taken'
                });
            } else{
                return next(err);
            }
        }
        res.json({
            username: savedUser.username,
            _id: savedUser._id
        });
    });
});

router.post('/add', (req, res, next) =>{
    res.json('post for add incomplete');
});

router.get('/users', (req, res, next) =>{
    res.json('get for users incomplete');
});

router.get('/log', (req, res, next) =>{
    res.json('get for log incomplete');
});

module.exports = router;