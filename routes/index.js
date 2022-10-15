var express = require('express');
var router = express.Router();
var homeController = require('../controllers/index');
var passport = require("passport")

/* GET home page. */
router.get('/', homeController.indexPage);

router.get('/about', homeController.aboutPage);

router.get('/project', homeController.projectPage);

router.get('/services', homeController.servicesPage);

router.get('/contact',homeController.contactPage);

// get  
router.get('/login',homeController.getLogin);


router.post('/login', passport.authenticate('local', {
  successRedirect: '/businessContacts',
  failureRedirect: '/login',
  failureFlash: true,
  failureMessage: "Invalid username or password",
}));


router.get('/logout', homeController.logoutUser);


router.post('/register', homeController.registerUser);

module.exports = router;
