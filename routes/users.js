const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../model/user');
const router = express.Router();

router.post("/", async(req, res) => {
    //if email exist return 400 error saying that account already exists
    //check validation on other parameters
    try{

        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(req.body.password, salt);

        let user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            isAdmin: req.body.isAdmin
        });
        user = await user.save();

        return res.send({
            username: user.username,
            email: user.email
        });
    }
    catch(e) {
        return res.status(500).send(e.message);
    }
});

module.exports = router;