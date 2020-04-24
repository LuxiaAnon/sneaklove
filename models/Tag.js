const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newTag = new Schema({
    label:{
        type : String,
        required: true } 
})

const Tag = mongoose.model("Tag", newTag);
module.exports=Tag