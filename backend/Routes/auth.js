// importing the express module to create the backend API for our iNotes app {npm i express to install the express}
const express = require("express");

// importing the bcrypt module for creating the hash of the password of the users.
const bcyrpt = require('bcrypt')

// imported JWT(Json Web Token) to send the unique token as a response to the use in return to the request to this end point.
const jwt = require('jsonwebtoken');
const JWT_SECRET = "Thisisthesecretsignature";

// initiating the Router method of the express. It is used to create the new routes or manage the new end points in express.
const router = express.Router();

// creating the user model instance to use it to create the user after geting the post request to the end point of this api /api/auth/createUser
const User = require('../Models/Users');


// importing the body and validationResult method from the express-validator module for validation of the data
// npm i -D express-validator { for Dev Dependencies}
const { body, validationResult } = require('express-validator');
const fetchuserdetails = require("../Middlewares/fetchuserdetails");


// Route 1: create a user using: POST request to the end point "/api/auth/createUser". This end point dosen't require the authenticaiton.
// validating the name, email and password, adding the custom error for invalid input.
router.post('/createUser', [
    body('name', 'The name should be atleast more than 3 letter').isLength({ min: 3 }),
    body('email', 'Enter the correct email.').isEmail(),
    body('password', 'The length of the password must be more that 5').isLength({ min: 5 }),
], async (req, res) => {

    try {
        // getting the result of the request to this end point and storing it to the constant as an error to throw error if any.
        const error = validationResult(req);

        // checking if their is any error and send the response according to it
        if (!error.isEmpty()) {
            return res.status(404).json({ errors: error.array() });
        }

        const salt = await bcyrpt.genSalt(10);
        const secure_pass = await bcyrpt.hash(req.body.password, salt);

        // validating if the user already exist. And sending the response according to it.
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            console.log(user);
            return res.status(404).json({ error: "Sorry a user already exist with this email" });
        }

        // creating user if the user not exist.
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secure_pass,
        })

        // sending the response in the form of json.
        // res.json(user)
        // Sending the Authentication Token
        const data = {
            user: {
                id: user.id
            }
        }
        const auth_token = jwt.sign(data, JWT_SECRET)
        res.json({ auth_token });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured.");
    }
});

// Route 2: login the user and sending the Authentication Token.
router.post('/login', [
    body('email', 'Enter the correct email.').isEmail({ min: 3 }),
    body('password', 'Enter the correcct password which should be minimum of 5 length.').isLength({ min: 5 })
], async (req, res) => {

    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    const {email, password} = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
        return res.status(400).json({ error: "Pls login with the correct credentials" });
        }
        const passwordCheck = await bcyrpt.compare(password, user.password);
        if (!passwordCheck) {
            return res.status(400).json({ error: "Pls login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const auth_token = jwt.sign(data, JWT_SECRET);

        res.send({auth_token});

    } catch (error) {
        console.log(error.message);
        res.status(500).json({error: "Internal Server error"});

    }
});

// Route 3 Get the Login User details : POST "api/auth/getuserdetail" . Login Required
router.post('/getuserdetail', fetchuserdetails , async (req, res)=>{
    try {
        userId = req.user.id;
        data = await User.findById(userId).select("-password");
        res.send(data);   
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;