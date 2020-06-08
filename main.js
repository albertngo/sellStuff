let express = require("express");
let server = express();

server.set("view engine", "ejs");
server.use(express.static('public'));

server.get("/",(req,resp)=>{
    resp.render("login");
})














server.listen(5500);
console.log("Listening on 5500........");