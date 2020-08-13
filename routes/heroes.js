const express = require('express');
const jwt = require('jsonwebtoken');

const Hero = require('../model/hero');

const router = express.Router();

router.get('/', async (req, res) => {
    try{
        let heroes = await Hero.find(); //Select all without filtering
        //let heroes = await Hero.find({deceased : true}); //Select with filtering
        //let heroes = await Hero.find().sort({name : 'asc'}); //Ordering
        //let heroes = await Hero.find().sort({name : 'asc'}).select({name : 1}); //select only attributes
        //let heroes = await Hero.find({ likeCount : {$nin : [3000]}}).sort({name : 'asc'}).select({name : 1}); //comparission operations
        //let heroes = await Hero.find().or([{likeCount : 3000}, {likeCount: 5000}]).sort({name : 'asc'}).select({name : 1}); //Logical operations (OR , AND Operations)
        //let heroes = await Hero.find().count().countDocuments(); //Get the count of the dataset
        res.send(heroes);
    }catch(e){
        res.status(500).send(e.message);
    }
});

router.get('/:id', async(req, res) => {
    try{

        let heroes = await Hero.findById(req.params.id);

        res.send(heroes);

    }catch(e){
        res.status(500).send(e.message);
    }
    
});

router.post('/', async (req, res) => {

    const token = req.header("x-jwt-token"); //x for user defined.
    
    console.log(token);
    if(!token) return res.status(400).send("Acces denied, No token.!");

    try{
        jwt.verify(token, SECRET_KEY);
    }catch(e){
        return res.status(400).send("Invalid token.!");
    }


    try{
        let heroToBeAddedToDb = new Hero({
            name: req.body.name,
            birthName: req.body.birthName,
            movies: req.body.movies,
            likeCount: req.body.likeCount,
            imgURL: req.body.imgURL,
            deceased: req.body.deceased

        });
    
        let hero = await heroToBeAddedToDb.save();

        res.send(heroToBeAddedToDb);

    }catch(e){
        res.status(500).send(e.message);
    }
    
});

router.put('/:id', async (req, res) => {
    console.log(req.params.id);
    try{
        let heroes = await Hero.findByIdAndUpdate(
            {_id : req.params.id},
            {$set: {likeCount: req.body.likeCount}}, 
            {useFindAndModify: false , new: true});

        console.log(heroes);    

        res.send(heroes);
       
    }catch(e){
        res.status(500).send(e.message);
    }   
});

router.delete('/:id', async (req, res) => {

    const token = req.header("x-jwt-token"); //x for user defined.
    if(!token) return res.status(400).send("Acces denied, No token.!");

    try{
        jwt.verify(token, SECRET_KEY);
    }catch(e){
        return res.status(400).send("Invalid token.!");
    }

    let decodedUser = jwt.decode(token, SECRET_KEY);
    if(!decodedUser) return res.status(403).send("Forbidden - You have no privilages to delete.!");

    try{
        let heroes = await Hero.findByIdAndDelete(req.params.id);
        res.send(heroes);
    }catch(e){
        res.status(500).send(e.message);
    }

    
    
});

module.exports = router;