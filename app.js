let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let mongoose = require("mongoose");

app.set("view engine", "ejs");

//MONGO-DB
mongoose.connect("mongodb+srv://albertngo:thisisngo1995@cluster0-lefh1.mongodb.net/sell-shop?retryWrites=true&w=majority",
{ useNewUrlParser: true ,useUnifiedTopology:true, useCreateIndex: true})


//MIDDLEWARE
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

let loginRouter = require("./api/routes/login");

//ROUTES
app.use("/login", loginRouter);


app.use((req,resp,next)=>{
    const error = new Error("not Found");
    error.status=404;
    next(error);
})

app.use((error, req, resp, next)=>{
    resp.status(error.status || 500);
    resp.json({
        error:{
            message: error
        }
    })

});

module.exports = app;
