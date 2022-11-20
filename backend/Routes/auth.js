// importing the express module to create the backend API for our iNotes app {npm i express to install the express}
const express = require("express");

// initiating the Router method of the express. It is used to create the new routes or manage the new end points in express.
const router = express.Router();

// creating the user model instance to use it to create the user after geting the post request to the end point of this api /api/auth/createUser
const User = require('../Models/Users');


// importing the body and validationResult method from the express-validator module for validation of the data
// npm i -D express-validator { for Dev Dependencies}
const { body, validationResult } = require('express-validator')


// create a user using: POST request to the end point "/api/auth/createUser". This end point dosen't require the authenticaiton.
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
            password: req.body.password,
        })

        // sending the response in the form of json.
        res.json(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured.");
    }
})


module.exports = router;