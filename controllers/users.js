const User = require('../models/user');
const passport = require('passport');

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}

module.exports.register = async (req, res, next) => {
    try {
    const {email, username, password} = req.body;
    const user = new User({email, username});
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, err => {
        if(err) return next();
        req.flash('success', 'Welcome to YelpCamp!')
        res.redirect('/campgrounds')
    })
    } catch(err) {
        req.flash('error', err.message);
        res.redirect('/register');
    }
}

module.exports.renderlogin = async (req, res) => {
    res.render('users/login');
}

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'Goodbye!');
    res.redirect('/campgrounds');
}

module.exports.login = async(req, res) => {
    req.flash('success', 'Welcome back!');
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}