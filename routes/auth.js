const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const User = mongoose.model("User");
const router = express.Router();

// Our welcome msg from the API
router.get('/',(req,res)=>{
    res.send("Welcome to our InstaClone API");
});

// Route to handle SignUp requests
router.post('/signup',(req,res)=>{
    const {name,email,password} = req.body;
    // Verifying if one of the fields is Empty
    if(!name || !password || !email){
        return res.status(422).json({error :"Please submit all required field"});
    }
    // Else we search the user with the credentials submitted
    User.findOne({Email: email})
        .then((savedUser)=>{
            // Verify if the user exist in the DB
            if(savedUser){
                return res.status(422).json({error :"This Email Is Already Used !"});
            }
            // We Hash the pwd before save into DB, more the number is high more it's more secure
            bcrypt.hash(password,12)
                .then(hashedPwd =>{
                    const user = new User({
                        Name: name,
                        Email: email,
                        Password: hashedPwd
                    });
                    // We save our new user to DB
                    user.save()
                        .then(user => {
                            res.json({message:'Saved successfully '})
                        })
                        .catch(err =>{
                            console.log(err)
                        })
                });
        })
        .catch(err => {
            console.log(err)
        });
});

// Route to handle SignIn requests
router.post('/signin',(req,res) =>{
    const {email,password} = req.body;
    // Verification for an empty field
    if(!email || !password){
        return res.status(422).json({error :"Please provide Email or Password"});
    }
    // Check if email exist in our DB
    User.findOne({Email:email})
        .then(savedUser =>{
            if(!savedUser){
                return res.status(422).json({error:"Invalid Email or Password"});
            }
            bcrypt.compare(password,savedUser.Password)
                .then(doMatch =>{
                    if(doMatch){
                        res.json({message:"successfully signed in"});
                    }else{
                        return res.status(422).json({error:"Invalid Email or Password"});
                    }
                })
        })
        .catch( err => {
            console.log(err);
        })
});
module.exports = router ;