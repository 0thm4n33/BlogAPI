const fs = require('fs');
const multer = require('multer');
const path = require('path');
const post = require('../models/post');
const Post = require('../models/post');
const DIRECTORY_FILE = 'assets/files/';
const CLOUD_BUCKET = 'back-end-blog.appspot.com';
const {Storage, Bucket} = require('@google-cloud/storage');
const {format} = require('util');
const charcters = ['\\','/','*','>','<','?',':'];
const storage = new Storage();
const bucket = storage.bucket(CLOUD_BUCKET);
exports.getOneArticle = (req,res,next)=>{
    Post.findOne(
        { postUrl: req.params.title })
    .then((article)=>{
        res.status(201).json(article);
    }).catch(error=>{
        res.status(404).json({message:"not found"})
    })
};

exports.deleteOnePost = (req,res,next)=>{
    console.log(`id: ${req.params.id}`);
    Post.deleteOne({_id:req.params.id}).
        then(()=>{
            console.log(`post founded`);
            res.status(200).json({
                message: 'post delted  !!'
            })
        }).
        catch(error=>{
            res.status(404).json({
                erro: `error while deleting post ${error}`
            })
        })
}



exports.getAllArticles = async (req,res,next) =>{
    const articles = await Post.find();
    res.status(201).json({posts:articles});
}

exports.verifyUrl = (req,res,next) =>{
    const postObject = JSON.parse(req.body.post);
    console.log(`verifiy function \n ${postObject}`)
    charcters.forEach((char)=>{
        let index = postObject.title.indexOf(char);
        if(index !== -1){
            postObject.postUrl = postObject.postUrl.replace(char,'-');
        }
     });
     req.body.post = postObject;
     next();
}

exports.modifyArticle = (req,res,next) =>{
   //TODO modify function inside rollback
   const postObject = JSON.parse(req.body.post);
   Post.deleteOne({_id:postObject.id}).then(()=>{
     multer,this.createPost(req,res,next)
     res.status(200).json({
         message: 'post modified 1'
     })
   }).catch(error =>{
       res.status(500).json({error})
   })
}

exports.createPost = async (req,res,next) =>{
    const postObject = req.body.post;
    if(postObject === '' || postObject.imageUrl === undefined) return;
    console.log(`image url ${req.body.post.imageUrl}`);
    writeFile(postObject).then((postUrl)=>{
        console.log(`post url : ${postUrl}`);
        const post = new Post({
            ...postObject,
            content: postUrl,
            userId: "1" //TODO GET ID FROM JWT
        });
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
    });
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

const writeFile = (post) =>{
    console.log('writing ....');
    return new Promise((successCall,failCall)=>{
        const nameFile = post.postUrl;
        let blob = bucket.file(nameFile);
        let blobStream = blob.createWriteStream();
        blobStream.on('error',()=>{
            failCall('error while writing ...')
        })
        blobStream.on('finish', async ()=>{
            await blob.makePublic();
            successCall(format(`https://storage.googleapis.com/${bucket.name}/${nameFile}`));
        });
        blobStream.end(post.content);
    });
}

