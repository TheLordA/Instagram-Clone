const express = require('express');
const mongoose = require('mongoose');
const loginmiddleware = require('../middleware/loginMiddleware');

const Post = mongoose.model("Post");
const router = express.Router();

router.get('/allpost',(req,res)=>{
    Post.find()
        .populate("PostedBy","_id Name")
        .then(posts =>{
            res.json({posts});
        })
        .catch(err =>{
            console.log(err);
        })
});

router.get('/mypost',loginmiddleware,(req,res) =>{
    Post.find({PostedBy:req.user._id})
        .populate("PostedBy","_id Name")
        .then(myposts =>{
            res.json(myposts);
        })
        .catch(err => {
            console.log(err);
        });
})

router.post('/createpost',loginmiddleware,(req,res)=>{
    const {title,body} = req.body;
    if(!title || !body){
        return res.status(422).json({error:"Please submit all the required fields."})
    }
    const post = new Post({
        Title:title,
        Body:body,  
        PostedBy:req.user
    })
    
    post.save()
        .then( result =>{
            res.json({post:result});
        })
        .catch( err => {
            console.log(err);
        })
});

module.exports = router ;