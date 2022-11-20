const express = require("express");
const router = express.Router();



router.get('/', (req, res)=>{
    res.send(res.body);
    console.log(res.body);
})


module.exports = router;