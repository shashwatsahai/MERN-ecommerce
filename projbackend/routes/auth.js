var express = require("express");
var router = express.Router();
const {check, validationResult} = require('express-validator');
const { signout, signup, signin, isSignedIn } = require("../controllers/auth");

router.post("/signup",
[
    check('name', 'name should be at least 3 characters').isLength({min:3}),
    check("email","email is required").isEmail(),
    check("password", "password at least 3 char").isLength({min:3})
],
 signup);
router.get("/signout", signout);

router.post("/signin",
[
    check('name', 'name should be at least 3 characters').isLength({min:3}),
    check("email","email is required").isEmail(),
    check("password", "password is required").isLength({min:1})
],
 signin);

router.get("/testroute", isSignedIn, (req, res) => {
    res.send("Passed a protected route")
})

module.exports = router;
