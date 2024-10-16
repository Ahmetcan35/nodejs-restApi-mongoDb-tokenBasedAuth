const express = require("express");
const router = express.Router();
const {User, validateRegister, validateLogin} = require("../models/user");
const bcrypt = require("bcrypt");


router.get("/",async (req, res) => {
    res.send();
});
router.post("/create",async (req, res) => {
    const {error} = validateRegister(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    let user = await User.findOne({email: req.body.email});

    if (user) {
        return res.status(404).send("Bu email daha önce kullanılmış");
    }

    hashedPassword  = await bcrypt.hash(req.body.password,10);
    user = new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword,
    });
    user.save();
    const token = user.createAuthToken();
    res.header("x-auth-token",token).send(user);
    
});

router.post("/auth",async (req, res) => {
    const {error} = validateLogin(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    let user = await User.findOne({email: req.body.email});
    if (!user) {
        return res.status(400).send("Böyle bir kullanıcı yok");
    }

    const isSuccess = await bcrypt.compare(req.body.password , user.password);
    if (!isSuccess) {
        return res.status(400).send("Hatalı parola girdiniz.");
    }

    const token = user.createAuthToken();
    res.send(token);
})
module.exports = router;