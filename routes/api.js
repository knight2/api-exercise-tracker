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
    Users.findById(req.body.userId, (err, user) =>{
        if(err) return next(err);
        if(!user){
            return next({
                status: 400,
                message: 'unknown _id'
            });
        }
        const exercise = new Exercises(req.body);
        exercise.username = user.username;
        exercise.save((err, savedExercise)=>{
            if (err) return next(err);

            savedExercise = savedExercise.toObject();
            delete savedExercise.__v;
            savedExercise._id = savedExercise.userId;
            delete savedExercise.userId;
            savedExercise.date = (new Date(savedExercise.date)).toDateString();
            res.json(savedExercise);
        });
    });
});

router.get('/users', (req, res, next) =>{
    Users.find({}, (err, data) =>{
        res.json(data);
    });
});

router.get('/log', (req, res, next) =>{
    res.json('get for log incomplete');
});

module.exports = router;