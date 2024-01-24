const express = require('express');
const router = express.Router();
const passport = require('passport');

// Controller
const {loginUser,registerUser,showAll} = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', passport.authenticate("local",{
    successMessage : "loggedIn",
    failureMessage: "failed",
    failureRedirect: "/failed"
}) ,loginUser);
router.get('/showAll', showAll);

module.exports = router;