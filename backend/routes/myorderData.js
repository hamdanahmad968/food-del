const express = require("express");
const router = express.Router();
const order = require("../models/Order")


// for my order page to display the history of the order of the user -----

router.post("/myorderData" , async(req , res)=>{
    try {
        let myData = await order.findOne({'email' : req.body.email})
        res.json({orderData : myData})
    } catch (error) {
        res.send("server error" , error.message)
    }
})

module.exports = router;