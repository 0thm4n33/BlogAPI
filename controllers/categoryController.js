const category = require('../models/category');

exports.getAllCategorys = (req,res,next) =>{
    console.log('category ...');
    category.find().then((categorys)=>{
        res.status(201).json({categorys})
    }).catch(error => {
        res.status(404).json({message: error})
    })
}