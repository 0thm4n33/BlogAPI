const express = require('express');
//const multer = require('../middleware/multer-config');
const {multer , uploadToGCS} = require('../middleware/images');
const blogControler = require('../controllers/blogController');
const route = express.Router();

route.get('/',blogControler.getAllArticles);

route.get('/:title',blogControler.getOneArticle);

route.post('/',multer.single('image'),blogControler.verifyUrl,
                    uploadToGCS,
                    blogControler.createPost);
//route.put('/:id',multer,blogControler.modifyArticle);

route.delete('/:id',blogControler.deleteOnePost);

module.exports = route;