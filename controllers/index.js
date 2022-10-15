const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports.indexPage = function (req, res) {
  res.render('index', { title: 'home',user:req.user });
}

module.exports.aboutPage = function (req, res) {
  res.render('about', { title: 'about',user:req.user  });
}

module.exports.projectPage = function (req, res) {
  res.render('project', { title: 'project',user:req.user  });
};

module.exports.servicesPage = function (req, res) {
  res.render('services', { title: 'services',user:req.user  });
};

module.exports.contactPage = function (req, res) {
  res.render('contact', { title: 'contact',user:req.user  });
};


module.exports.getLogin = function (req, res) {
  
  //check for invalid login message in the session object
  const messages = req.session.messages || [];

  // clear the session message
  req.session.messages = [];
 
  res.render('login',
    {
      title: 'login',
      message: messages,
      user: req.user
    });
}

module.exports.logoutUser = function (req, res) {

  req.session.messages = []

  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
};

module.exports.registerUser = function (req, res) {
  // confirm user doesn't already exist
  User.findOne({ username: req.body.username }, async function (err, user) {
   if (user) {
     res.redirect('/login');
   } else {
     const hashedPassword = await bcrypt.hashSync(req.body.password, 10);
     // create user
     var newUser = new User({
       username: req.body.username,
       password: hashedPassword,
       email: req.body.email,
       address: req.body.address,
       city: req.body.city,
     });
     await newUser.save();
     res.json("User created");
   }
 })
}