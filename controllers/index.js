/**
 * Module dependencies.
 */
const path = require('path');
const multer = require('multer');// Node.js middleware for handling multipart/form-data.

const upload = multer({dest: path.join(__dirname, '../data/uploads')});

/**
 * API keys and Passport configuration.
 */
const passportConfig = require('../config/passport');

/**
 * Controllers (route handlers).
 */
const homeController = require('./home');
const userController = require('./user');
const apiController = require('./api');
const contactController = require('./contact');


/**
 * Controllers init
 * @param app
 */
exports.init = (app, passport) => {
    /**
     * Primary app routes.
     */
    app.get('/', homeController.index);
    app.get('/login', userController.getLogin);
    app.post('/login', userController.postLogin);
    app.get('/logout', userController.logout);
    app.get('/forgot', userController.getForgot);
    app.post('/forgot', userController.postForgot);
    app.get('/reset/:token', userController.getReset);
    app.post('/reset/:token', userController.postReset);
    app.get('/signup', userController.getSignup);
    app.post('/signup', userController.postSignup);
    app.get('/contact', contactController.getContact);
    app.post('/contact', contactController.postContact);
    app.get('/account', passportConfig.isAuthenticated, userController.getAccount);
    app.post('/account/profile', passportConfig.isAuthenticated, userController.postUpdateProfile);
    app.post('/account/password', passportConfig.isAuthenticated, userController.postUpdatePassword);
    app.post('/account/delete', passportConfig.isAuthenticated, userController.postDeleteAccount);
    app.get('/account/unlink/:provider', passportConfig.isAuthenticated, userController.getOauthUnlink);

    /**
     * API examples routes.
     */
    app.get('/api', apiController.getApi);
    app.get('/api/github', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getGithub);
    app.get('/api/twitter', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getTwitter);
    app.post('/api/twitter', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.postTwitter);
    app.get('/api/lastfm', apiController.getLastfm);
    app.get('/api/nyt', apiController.getNewYorkTimes);
    app.get('/api/aviary', apiController.getAviary);
    app.get('/api/steam', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getSteam);
    app.get('/api/stripe', apiController.getStripe);
    app.post('/api/stripe', apiController.postStripe);
    app.get('/api/scraping', apiController.getScraping);
    app.get('/api/twilio', apiController.getTwilio);
    app.post('/api/twilio', apiController.postTwilio);
    app.get('/api/clockwork', apiController.getClockwork);
    app.post('/api/clockwork', apiController.postClockwork);
    app.get('/api/foursquare', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getFoursquare);
    app.get('/api/tumblr', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getTumblr);
    app.get('/api/facebook', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getFacebook);
    app.get('/api/linkedin', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getLinkedin);
    app.get('/api/instagram', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getInstagram);
    app.get('/api/paypal', apiController.getPayPal);
    app.get('/api/paypal/success', apiController.getPayPalSuccess);
    app.get('/api/paypal/cancel', apiController.getPayPalCancel);
    app.get('/api/lob', apiController.getLob);
    app.get('/api/upload', apiController.getFileUpload);
    app.post('/api/upload', upload.single('myFile'), apiController.postFileUpload);
    app.get('/api/pinterest', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getPinterest);
    app.post('/api/pinterest', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.postPinterest);
    app.get('/api/google-maps', apiController.getGoogleMaps);

    /**
     * OAuth authentication routes. (Sign in)
     */
    app.get('/auth/instagram', passport.authenticate('instagram'));
    app.get('/auth/instagram/callback', passport.authenticate('instagram', {failureRedirect: '/login'}), (req, res) => {
        res.redirect(req.session.returnTo || '/');
    });
    app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email', 'public_profile']}));
    app.get('/auth/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/login'}), (req, res) => {
        res.redirect(req.session.returnTo || '/');
    });
    app.get('/auth/github', passport.authenticate('github'));
    app.get('/auth/github/callback', passport.authenticate('github', {failureRedirect: '/login'}), (req, res) => {
        res.redirect(req.session.returnTo || '/');
    });
    app.get('/auth/google', passport.authenticate('google', {scope: 'profile email'}));
    app.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/login'}), (req, res) => {
        res.redirect(req.session.returnTo || '/');
    });
    app.get('/auth/twitter', passport.authenticate('twitter'));
    app.get('/auth/twitter/callback', passport.authenticate('twitter', {failureRedirect: '/login'}), (req, res) => {
        res.redirect(req.session.returnTo || '/');
    });
    app.get('/auth/linkedin', passport.authenticate('linkedin', {state: 'SOME STATE'}));
    app.get('/auth/linkedin/callback', passport.authenticate('linkedin', {failureRedirect: '/login'}), (req, res) => {
        res.redirect(req.session.returnTo || '/');
    });
    // app.get('/auth/steam', passport.authorize('steam', {state: 'SOME STATE'}));
    // app.get('/auth/steam/callback', passport.authorize('steam', {failureRedirect: '/login'}), (req, res) => {
    //     res.redirect(req.session.returnTo || '/');
    // });

    app.get('/auth/steam', passport.authenticate('steam', {state: 'SOME STATE'}));
    app.get('/auth/steam/callback', passport.authenticate('steam', {failureRedirect: '/login'}), (req, res) => {
        res.redirect(req.session.returnTo || '/');
    });


    /**
     * OAuth authorization routes. (API examples)
     */
    app.get('/auth/foursquare', passport.authorize('foursquare'));
    app.get('/auth/foursquare/callback', passport.authorize('foursquare', {failureRedirect: '/api'}), (req, res) => {
        res.redirect('/api/foursquare');
    });
    app.get('/auth/tumblr', passport.authorize('tumblr'));
    app.get('/auth/tumblr/callback', passport.authorize('tumblr', {failureRedirect: '/api'}), (req, res) => {
        res.redirect('/api/tumblr');
    });
    app.get('/auth/pinterest', passport.authorize('pinterest', {scope: 'read_public write_public'}));
    app.get('/auth/pinterest/callback', passport.authorize('pinterest', {failureRedirect: '/login'}), (req, res) => {
        res.redirect('/api/pinterest');
    });
};