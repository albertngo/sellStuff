//LOGIN ROUTER
let express = require("express")
let router = express.Router();
let mongoose = require("mongoose");
let multer = require("multer");
let Product = require("../models/products")

let storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads');
    },
    filename: function(req,file,cb){
        let name = new Date().toISOString().replace(/:/g,"-");
        name = name.replace(/\./g,"-");
        cb(null,  name + file.originalname);
    }
})

let upload = multer({storage:storage});

router.get("/", (req,resp)=>{
    //get all the products
    Product.find().exec()
    .then(products=>{
        console.log(products);
        resp.render("salepage", {products:products});
    })
    .catch(error=>{
        console.log(produicts)
    })
    
})

router.delete("/", (req,resp)=>{
    console.log(req.body.id);
    //get all the products
    Product.remove({_id: req.body.id}).exec()
    .then(result=>{
        resp.status(200).json({
            message: "Delete Successful!"
        })
    })
    .catch(error=>{
        console.log(error)
    })
    
})


router.post("/new-Product",upload.single("image"), (req,resp)=>{
    
    // console.log(req.file);
    let product = new Product({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: req.file.path
    })

    product.save()
    .then(result=>{
        resp.status(200).send("Object Created");
    })
    .catch(error=>{
        console.log(error);
        resp.status(500).json({
            error: "All Fields Are Required"
        });
    })
    
})


module.exports = router;