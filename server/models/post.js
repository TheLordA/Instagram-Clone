const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
    Title:{
        type:String, 
        required:true
    },
    Body:{
        type:String, 
        required:true
    },
    Photo:{
        type:String, 
        default:"no photo"
    },
    PostedBy:{
        type:ObjectId, 
        ref :"User"
    }
});

mongoose.model('Post',postSchema);