
const BusinessContact = require('../models/businessContact');

module.exports.businessContactList = function (req, res) {
  BusinessContact.find().sort({ name: 1 }).exec(function (err, contacts) {
    if (err) {
      console.log(err);
    } else {
      res.render('businessContacts', {
        title: 'businessContacts',
        user: req.user,
        businessContacts: contacts
      });
    }
  });
} 


module.exports.getUpdateBusinessContactPage = function (req, res) {
  BusinessContact.findById(req.params._id, function (err, contact) {
    if (err) {
      console.log(err);
    } else {
      
      res.render('editBusinessContact', {
        title: 'Update Contact',
        businessContact: contact,
        user: req.user,
        message:req.flash("message")
      });
    }
  });
};
module.exports.getCreateBusinessContactPage = function (req, res) {
  res.render('editBusinessContact', {
    title: 'Create Contact',
    user: req.user,
    businessContact: "",
    message:""
  });
};

module.exports.createBusinessContact = function (req, res) {
  BusinessContact.create(req.body, function (err, contact) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/businessContacts');
    }
  });
};

module.exports.updateBusinessContact = function (req, res) {

  BusinessContact.findOneAndUpdate({ _id: req.params._id }, {
    name: req.body.name,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
   }, function (err, contact) {
    if (err) {
      req.flash("message","something is wrong!")
      res.status(500).json(err);
    } else {
      req.flash("message","The contact was updated successfully");
      res.redirect('/businessContacts/' + contact._id);
    }
  });
}

module.exports.deleteBusinessContact = function (req, res) {
  BusinessContact.findByIdAndRemove(req.params._id, function (err, contact) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/businessContacts');
    }
  });
}
