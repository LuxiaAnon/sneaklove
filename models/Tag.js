const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newTag = new Schema({
    label:String
})

const Tag = mongoose.model("Tag", newTag);
module.exports=Tag