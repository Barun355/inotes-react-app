require('dotenv').config();

const jwt = require('jsonwebtoken');

const fetchuserdetails = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');

    if(!token){
        res.status(401).send({erro: "Pls enter the valid token"});
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data.user;
        next();   
    } catch (error) {
        res.status(401).send({erro: "Pls enter the valid token"});
    }
};

module.exports = fetchuserdetails;