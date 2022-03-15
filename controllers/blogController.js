const fs = require('fs');
const path = require('path');
const Post = require('../models/post');
const DIRECTORY_FILE = 'assets/files/';
const charcters = ['\\','/','*','>','<','?',':'];

exports.getOneArticle = (req,res,next)=>{
    Post.findOne(
        { postUrl: req.params.title })
    .then((article)=>{
        res.status(201).json(article);
    }).catch(error=>{
        res.status(404).json({message:"not found"})
    })
};

exports.getAllArticles = async (req,res,next) =>{
    const articles = await Post.find();
    res.status(201).json({posts:articles});
}  

exports.createPost = async (req,res,next) =>{
    const postObject = JSON.parse(req.body.post);
    if(typeof postObject === undefined){
        return;
    }
    charcters.forEach((char)=>{
        let index = postObject.title.indexOf(char);
        if(index !== -1){
            postObject.postUrl = postObject.postUrl.replace(char,'_');
        }
     });
    createFile(postObject).then(()=>{ 
        console.log("filed crated")      
        const ADDRESS = `${req.protocol}://${req.get('host')}/assets/`;
        const post = new Post({
            ...postObject,
            imageUrl: ADDRESS+`images/${req.file.filename}`,
            content: ADDRESS+`files/${postObject.postUrl}`,
            userId: "1"
        });
        console.log(post);
        post.save().then(()=>{
            res.status(201).json({
                message: "Post addeed"
            })
        }).catch(error =>{
            res.status(401).json({
                error: error
            })
        }); 
    }).catch(error=>{
        console.log("error: "+error);
    })
}

const createFile = async (post) =>{
    let fullPath = path.join(__dirname,'../'+DIRECTORY_FILE);
    const nameFile = fullPath+post.postUrl+'.txt';
    return fs.writeFile(nameFile,post.content,(err)=>{
        if(err){
            throw err;
        } 
    });
}

