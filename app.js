const express = require("express");
const app = express();
const ejs = require("ejs");
const layouts = require("express-ejs-layouts");
app.use(express.static("public"));
app.use(layouts);

app.set("view engine", "ejs");
app.set("layout", "./layouts/main")

app.get("/", (req, res) => {
   res.render("index")
})



app.listen(3000, () => {
   console.log("running");
})