const GOOGLE_CLOUD_PROJECT = process.env.GCLOUD_STORAGE_BUCKET;
const CLOUD_BUCKET = 'back-end-blog.appspot.com';
const {Storage, Bucket} = require('@google-cloud/storage');
const {format} = require('util');
const Multer = require('multer');

//multer config
const multer = Multer({
    multer : Multer.memoryStorage(),
    limits: {
        fileSize : 5 * 1024 * 1024,
    },
});

const config ={
    projectId: 'back-end-blog',
    keyFileName : '../back-end-blog-f504f39676a6.json'
}

//bucket config
const storage = new Storage(config.projectId,config.keyFileName);
const bucket = storage.bucket(CLOUD_BUCKET);
console.log(`bucket name : ${bucket.name}`);
const uploadToGCS = (req,res,next) => {
    console.log(`upload function ${req.file.mimetype}`);
    if(!req.file){
        res.status(400).json('No file founded');
        console.log('file not found !')
        next();
    }
    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream({
        metadata:{
            contentType : req.file.mimetype,
        },
        resumable: false
    });
    blobStream.on('error',(err)=>{
        console.log(`error ${err}`);
        next();
    });
    blobStream.on('finish',async ()=>{
        await blob.makePublic();
        console.log('finished');
        req.body.post.imageUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
        next();
    });
    console.log('finsih event skipped !');
    blobStream.end(req.file.buffer);
}

module.exports = {
    multer,
    uploadToGCS
}

