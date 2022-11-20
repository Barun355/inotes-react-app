const express = require("express");
const router = express.Router();
const User = require('../Models/Users');
const {body, validationResult} = require('express-validator')


// create a user using: POST "/api/auth". Dosen't require asuth
router.get('/',[
    body('name', 'The name should be atleast more than 3 letter').isLength({min: 3}),
    body('email', 'Enter the correct email.').isEmail(),
    body('password', 'The length of the password must be more that 5').isLength({min: 5}),
], (req, res)=>{
    const error = validationResult(req);

    if(!error.isEmpty()){
        return res.status(400).json({errors: error.array()});
    }
    // res.send(req.body);
    // console.log(req.body);
    // const user = User(req.body);
    // user.save();
    // console.log(req.body.email);
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }).then(user => res.json(user)).catch( err=> {
        console.log(err);
        res.json({err: "Enter the valid email", message: err.message});
    })
})


module.exports = router;