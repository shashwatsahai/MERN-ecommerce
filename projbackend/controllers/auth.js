const { validationResult } = require("express-validator");
const User = require('../models/user');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

var signup = (req, res) => {
  const errors = validationResult(req)
  // console.log(errors);
  if(!errors.isEmpty()){
    return res.status(422).json({
      error: errors.array()[0].msg
    })
  }
  const user = new User(req.body);

  user.save((err, user) => {
    if(err){
      console.log("ERROR", err);
      return res.status(400).json({
        error: "NOT able to save user to db"+err
      })
    }
    console.log('Saved user')
    res.json({
      name: user.name,
      email: user.email,
      id: user._id
    });
  });
};

var signout = (req, res) => {
  res.clearCookie('token')
  res.json({
    message: "User signed out successfully"
  });
};

var signin = (req, res) => {
  const errors = validationResult(req)
  // console.log(errors);
  if(!errors.isEmpty()){
    return res.status(422).json({
      error: errors.array()[0].msg
    })
  } 
  const {email, password} = req.body;

  User.findOne({email: email},(err, user) => {
    console.log(err)
    if(err || !user){
      return res.status(400).json({
        error: "USER email does not exist"
      })
    }


    if(!user.authenticate(password)){
      return res.status(400).json({
        error: "Incorrect email or password"
      })
    }

    const token = jwt.sign({_id: user._id}, process.env.PRIVATE_KEY);
    res.cookie("token", token, {expire: new Date() + 99999});
    const {_id, name, email, role} = user;
    return res.json({token, user:{_id, name, email, role}});
  })


};

var isSignedIn = expressJwt({
  secret: process.env.PRIVATE_KEY,
  userProperty: "auth"
})

module.exports = {
  signup,
  signout,
  signin,
  isSignedIn
}