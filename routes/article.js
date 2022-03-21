const express = require('express');
const multer = require('../middleware/multer-config');
const blogControler = require('../controllers/blogController');
const route = express.Router();

route.get('/',blogControler.getAllArticles);

route.get('/:title',blogControler.getOneArticle);

route.post('/',multer,blogControler.createPost);

route.delete('/:id',blogControler.deleteOnePost);

module.exports = route;