//create programming model
//it is mapped to programming collection

//import mongoose
let mongoose = require("mongoose")

//use mongoose to create mongo schema
let mongoSchema = mongoose.Schema

//use mongoSchema to map with programming collection in mongodb database
let programmingSchema = new mongoSchema({
    "videoid": String,
    "likes": Number,
    "dislikes": Number,
    "title": String
}, {collection:"programming"})

//export the model
module.exports = mongoose.model('programming', programmingSchema)
