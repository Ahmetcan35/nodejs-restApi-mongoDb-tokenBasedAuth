const Joi = require('joi');
const auth = require("../middleware/auth");

const express = require("express");
const router = express.Router();
const {Product,Comment, validateProduct} = require("../models/product");
const isAdmin = require('../middleware/isAdmin');

router.get("/",async (req,res)=>{
    const products = await Product.find().populate("category","name -_id")
                                            .select("-isActive  -comments.date");
    res.send(products);
});
router.put("/comment/:id",async (req,res)=>{
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).send("Aradığınız ürün bulunamadı.");
    }
    
    const comment = new Comment({
        text: req.body.text,
        username :req.body.username
    });

    product.comments.push(comment);
    const updateComment= await product.save();
    res.send(updateComment);

});
router.delete("/comment/:id",async (req,res)=>{
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).send("Aradığınız ürün bulunamadı.");
    }
    
    const comment = Comment.findByIdAndDelete(req.body.commentid);
    const deleteComment= await product.save();
    res.send(deleteComment);

});
router.post("/",[auth, isAdmin ],async (req,res)=>{

    const {error} = validateProduct(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    const product = new Product({
        name:req.body.name,
        price:req.body.price,
        description:req.body.description,
        imageUrl:req.body.imageUrl,
        isActive:req.body.isActive,
        category:req.body.category,
        comments:req.body.comments,
    });
    const newProduct= await product.save();
    res.send(newProduct);
    
});
router.put("/:id",async (req,res)=>{
    //ürünü alma
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).send("Aradığınız ürün bulunamadı.");
    }

    //validate
    const {error} = validateProduct(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
        
    }
    product.name = req.body.name;
    product.price = req.body.price;
    product.description = req.body.description;
    product.imageUrl = req.body.imageUrl;
    product.isActive = req.body.isActive;
    product.category = req.body.category;
    product.comments = req.body.comments;
    
    const updatedProduct = await product.save();    

    res.send(updatedProduct);





});
router.delete("/:id",async (req,res)=>{
    
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
        return res.status(404).send("Aradığınız ürün bulunamadı.");
    }
    res.send(products);


});


router.get("/:id",async(req,res)=>{
    const product = await Product.findById(req.params.id).populate("category","name -_id");  
    if (!product) {
        return res.status(404).send("Aradığınız ürün bulunamadı.");
    }
    res.send(product);
});
module.exports =router;