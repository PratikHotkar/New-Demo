const express = require("express");
const router= express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/user");

router.route("/signup")
    .get(userController.renderSignUpForm)
    .post(wrapAsync(userController.signUpUser));

router.route("/login")
    .get(userController.renderLoginForm)
    .post(saveRedirectUrl, passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), userController.loginUser);

router.get("/logout", userController.logOutUser);

module.exports = router;