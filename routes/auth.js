
/*
    Auth Routes
    host +/api/auth
*/

const { Router } = require('express');
const { createUser, loginUser, renewToken } = require('../controllers/auth');
const router = Router();

const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/fieldValidators');
const { jwtValidator } = require('../middlewares/jwt-validator');


const commonChecks = [
    check('password', 'Min password length is 6').isLength({ min: 6 }),
    check('email', 'Email is required').isEmail(),
    fieldValidator,
];

router.post('/new',
    [
        //Middlewares
        ...commonChecks,
        check('name', 'Name is required').not().isEmpty(),
    ],
    createUser
);

router.post(
    '/',
    [
        //Middlewares
        ...commonChecks
    ],
    loginUser
);


router.get(
    '/renew',
    jwtValidator,
    renewToken
);


module.exports = router;