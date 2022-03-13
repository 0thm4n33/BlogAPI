const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {type:String, required:true},
    subtitle: {type: String,required:true},
    imageUrl: {type: String, required:true},
    content: {type: String, required:true},
    postUrl: {type:String , required:true},
    category: {type:String, required: true},
    userId: {type: String, required:true},
});

module.exports = mongoose.model('Post',postSchema);