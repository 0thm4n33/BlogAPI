const express = require('express');
const route = express.Router();
const categoryController = require('../controllers/categoryController');

route.get('/',categoryController.getAllCategorys);
route.put('/:id',categoryController.updateCategory);
route.post('/',categoryController.createCategory);
route.delete('/:id',categoryController.deleteOneCategory);
module.exports = route;