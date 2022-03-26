const Category = require('../models/category');

exports.getAllCategorys = (req,res,next) => {
    Category.find().then((categorys)=>{
        res.status(201).json({categorys})
    }).catch(error => {
        res.status(404).json({message: error})
    })
}

exports.deleteOneCategory = (req,res,next)=>{
    console.log('>> delete controller')
    Category.deleteOne({_id:req.params.id}).then(()=>{
        res.status(204).json({
            message: 'ressources deleted successfully!'
        })
    }).catch((error)=>{
        res.status(500).json(error)
    })
}

exports.createCategory = (req,res,next) =>{   
    const category = new Category({
        name: req.body.name
    });
    category.save().then(()=>{
        res.status(201).json({
            message: 'Category bien ajoute'
        }).catch(error=>{
            console.error(error);
            res.status(500).json(error);
        })
    })
}

exports.updateCategory = (req,res,next) => {
    console.log(`${req.params.id}: ${req.body.name}`)
    Category.updateOne(
        {_id:req.params.id},{name:req.body.name,_id:req.params.id}).then(()=>{
            res.status(201).json('Category modified !')
    }).catch((error=>{
        console.error(error);
        res.status(500).json(error);
    }));
}