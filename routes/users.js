const { render } = require('ejs');
const express = require('express');
const wrapAsync = require('../utils/wrapAsync');
const router = express.Router();
const users = require('../controllers/users');
const passport = require('passport')

router.route('/register')
    .get(users.renderRegister)
    .post(wrapAsync(users.register));

router.route('/login')
    .get(users.renderlogin)
    .post(
        passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }),
        wrapAsync(users.login));

router.get('/logout', users.logout);

module.exports = router;