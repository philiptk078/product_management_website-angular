const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/user');
const ProductData = require('../models/productdata');
const db = 'mongodb+srv://user_philip:userphilip123@mycluster.vd3e6.mongodb.net/eventdb?retryWrites=true&w=majority';

mongoose.connect(db, function(err){
    if(err){
        console.error('Error' +err);
    } else {
        console.log('Connected to mongodb');
    }
});

router.get('/', (req,res)=>{
    res.send("From API");
});

function verifyToken(req, res, next){
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorised request');
    }
    let token = req.headers.authorization.split(' ')[1];
    if(token === 'null'){
        return res.status(401).send('Unauthorized request');
    }
    let payload = jwt.verify(token, 'secretKey');
    if(!payload){
        return res.status(401).send('Unauthorized request');
    }
    req.userId = payload.subject;
    next();
}

router.get('/products', function(req,res){
    res.header("Access-Control-Allow-Orgin","*");
    res.header("Access-Control-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    ProductData.find()
    .then(function(products){
        res.send(products);
    });
});

router.post('/insert',verifyToken, function(req,res){
    res.header("Acccess-Control-Allow-Orgin", "*");
    res.header("Access-Control-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    console.log(req.body);
    var product = {
        productId: req.body.product.productId,
        productName: req.body.product.productName,
        productCode: req.body.product.productCode,
        releaseDate: req.body.product.releaseDate,
        description: req.body.product.description,
        price: req.body.product.price,
        starRating: req.body.product.starRating,
        imageUrl: req.body.product.imageUrl
    };
    var product = new ProductData(product);
    product.save();
});

router.post('/edit',verifyToken,(req,res)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Methods :GET,POST,PATCH,PUT,DELETE,OPTIONS')

    const product = {
            productId : req.body.product.productId,
            productName : req.body.product.productName,
            productCode : req.body.product.productCode,
            releaseDate : req.body.product.releaseDate,
            description : req.body.product.description,
            price : req.body.product.price,
            starRating : req.body.product.starRating,
            imageUrl : req.body.product.imageUrl
    }
    console.log("Data from server " + req.body.product._id);
    ProductData.updateOne(
        {_id:req.body.product._id},{$set:product},
         function(err,res){
         if(err){
             console.log(err)
            }
        })   
    });


router.delete('/delete/:uid',verifyToken,(req,res)=>{
    let uid=req.params.uid;
    ProductData.findByIdAndRemove(uid)
      .then(()=>{
          console.log('product deleted successfully');
          res.status(200).json({uid});
  
      })
      .catch((err)=>{
          console.log('product delete failed',err);
      })
  })

router.post('/register', (req,res) => {
    let userData = req.body;
    let user = new User(userData);
    user.save((err, registeredUser) => {
        if(err) {
            console.log(err);
        }else{
            let payload = {subject: user._id};
            let token = jwt.sign(payload, 'secretKey');
            res.status(200).send({token});
            // res.status(200).send(registeredUser);
        }
    });
});

router.post('/login', (req,res) => {
    let userData = req.body;
    User.findOne({email: userData.email}, (err, user) =>{
        if(err) {
            console.log(err);
        }   
        else 
        {
            if (!user) 
            {
                res.status(401).send('Invalid Email');
            } 
            else if(user.password !== userData.password)
            {
                res.status(401).send('Invalid Password');
            } 
            else 
            {
                let payload = {subject: user._id};
                let token = jwt.sign(payload, 'secretKey');
                res.status(200).send({token});
                // res.status(200).send(user);
            }
        }
    });
});


module.exports = router;