const Users = require('../models/users.js');
const Exercises = require('../models/exercises.js');

const router = require('express').Router();

router.post('/new-user', (req, res, next) =>{
    res.json('post for new-user incomplete');
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