//Imports
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

//Port 
const port = process.env.PORT || 3000;

const app = express();

//seting static files
app.use(express.static("public")); //for serving static file
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/img", express.static(__dirname + "public/img"));

app.set("views", path.join(__dirname, "views"));

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get("/", (req, res) => {

    res.sendFile("index.html");
});
//Listening on port 3000
app.listen(port, () => {
    console.log(`sever started on port ${port}`);
});
