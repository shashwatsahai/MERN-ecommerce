exports.signup = (req, res) => {
  console.log("REQ",req.body)
  res.json({
    message: "signup route works!"
  });
};

exports.signout = (req, res) => {
  res.json({
    message: "User signout"
  });
};
