const express = require('express');
const route = express.Router();
const categoryController = require('../controllers/categoryController');

route.get('/',categoryController.getAllCategorys);

module.exports = route;