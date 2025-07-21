const mongoose = require("mongoose")
const post = new mongoose.Schema({
    title:{type:String,required:true,minLength:5},
    description:{type:String,required:true,minLength:5},
    author:{type:String,required:true,unique:true}
},{timestamps:true})
// exports.post=mongoose.Model("post",post)\
const ourPost = mongoose.model("post",post)
module.exports = ourPost