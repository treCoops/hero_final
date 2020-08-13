const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

const SECRET_KEY = "p@$$w0rd";

const User = require('../model/user');

router.post('/', async (req, res) => {
    try{
        let user = await User.findOne({email: req.body.email});
        if(!user) return res.status(400).send("Invalid email or password.!");
        let validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword) return res.status(400).send("Invalid email or password.!");

        // let token = jwt.sign({
        //     id: user._id,
        //     email: user.email,
        //     isAdmin: user.isAdmin
        // }, SECRET_KEY, {expiresIn: 10000});

        let token = jwt.sign({
            id: user._id,
            email: user.email,
            isAdmin: user.isAdmin
        }, SECRET_KEY);

        res.send({
            token: token
        });

    } catch(e){
        return res.status(500).send(e.message);
    }
});


module.exports = router;