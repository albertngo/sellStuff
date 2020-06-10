let mongoose = require("mongoose");

let Product = require("../models/products")



exports.sale_get_controller = (req,resp)=>{
    //get all the products
    Product.find().exec()
    .then(products=>{
        console.log(products);
        resp.render("salepage", {products:products});
    })
    .catch(error=>{
        console.log(produicts)
    })
    
}

exports.sale_delete_controller =(req,resp)=>{
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
    
}

exports.sale_post_controller = (req,resp)=>{
    
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
    
}