const express = require("express");
const router = express.Router();
const User = require('../Models/Users');


// create a user using: POST "/api/auth". Dosen't require auth
router.get('/', (req, res)=>{
    res.send(req.body);
    console.log(req.body);
    const user = User(req.body);
    user.save();
})


module.exports = router;