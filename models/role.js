const mongoose = require('mongoose');

const roleSchema = mongoose.Schema({
    nameOfRole : {type:String, required: true}
});

module.exports = mongoose.model('Role',roleSchema);