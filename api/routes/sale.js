//SALE ROUTER
let express = require("express")
let router = express.Router();
let multer = require("multer");
let salesController = require("../collections/salepage")


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

router.get("/", salesController.sale_get_controller)

router.delete("/", salesController.sale_delete_controller)

router.post("/new-Product" ,upload.single("image"), salesController.sale_post_controller)


module.exports = router;