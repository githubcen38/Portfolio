
var express = require('express');
var router = express.Router();
var { isLoggedIn } = require('../config/auth');
var businessContactController = require('../controllers/businessContact');

router.get('/', isLoggedIn, businessContactController.businessContactList); // business contact list page 

router.get('/create', isLoggedIn,businessContactController.getCreateBusinessContactPage); // create a new business contact page

router.post('/create', isLoggedIn,businessContactController.createBusinessContact); // create a new business and add it to mongodb

router.get('/:_id', isLoggedIn, businessContactController.getUpdateBusinessContactPage); // get a business contact by id

router.post('/:_id', isLoggedIn, businessContactController.updateBusinessContact);// update a business contact by id

router.get('/delete/:_id', isLoggedIn, businessContactController.deleteBusinessContact);// delete a business contact by id


module.exports = router; 
