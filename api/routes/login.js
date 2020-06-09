//LOGIN ROUTER
let express = require("express")
let router = express.Router();
let mongoose = require("mongoose");
let User = require("../models/users")

router.get("/newUser",(req,resp)=>{
    // resp.render("login")
    resp.status(200).json({
        message:"Test Object",
        hello: "djeqwife"
    })
})
router.get("/",(req,resp)=>{
    resp.render("login")

})

router.post("/newUser",(req,resp)=>{
    //interact with mongoDB
    console.log(req.body);
    
    let user = new User({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: req.body.password, 
        userType: req.body.type
    })

    user.save()
    .then(result=>{
        console.log(result);
        resp.status(200).json({
            message: "User Created",
            user: user
        })
    })
    .catch(error=>{
        console.log(error);
        if (error.code == 11000){
            resp.status(500).json({
                errorCode: error.code,
                message: "The email address already exists"
            })
        } else{
            resp.status(500).json({
                errorCode: 1020,
                message: "Improper email address"
            })
        }


    })
    
    

})

module.exports = router;