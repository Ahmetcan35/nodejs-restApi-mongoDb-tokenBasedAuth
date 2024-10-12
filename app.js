const express = require("express");
const app = express();
const products = require("./router/products");
const category = require("./router/category");
const user = require("./router/user");
const home = require("./router/home");
const cors = require("cors");
const mongoose = require("mongoose");
const { date } = require("joi");
app.use(express.json());
app.use(cors({
    origin:"*",
    methods:["GET"]
}));
app.use("/api/products",products);
app.use("/api/categories",category);
app.use("/api/users",user);
app.use("/",home);

const username = "ahmetcancetinz";
const password ="17666361758a";
const database ="shopdb";
(async()=>{
    try {
        await mongoose.connect(`mongodb+srv://${username}:${password}@ahmetcan.qcymhtx.mongodb.net/${database}?retryWrites=true&w=majority&appName=Ahmetcan`);
        console.log("MongoDb sunucusuna başarılı bir şekilde bağlandı.");
    } catch (err) {
        console.log(err);
    }
})();

app.listen(3000,  () => {
    console.log("listening on port 3000");
})  