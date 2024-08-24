const express = require('express');
const router = express.Router();
const passport = require("passport");

router.get('/', function (req, res, next) {
    const userId = req.session.userid;
    const isAuth = Boolean(userId);
    res.render('signin', {
        title: 'Sign in',
        isAuth: isAuth,
    });
});

router.post('/', passport.authenticate('local', (err, user, info) => {
    router.post('/', (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) { 
                return next(err); 
            }
            if (!user) {
                return res.redirect('/signin'); 
            }
            req.logIn(user, (err) => {
                if (err) { 
                    return next(err); 
                }
                console.log('Session after login:', req.session);
                req.session.userid = user.id;
                return res.redirect('/');
            });
        })(req, res, next); // req, res, next を渡す
    });
})); 

module.exports = router;