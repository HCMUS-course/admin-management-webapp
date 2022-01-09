const mongoose=require("mongoose")

const commentSchema=mongoose.Schema({
    content:String,
    createAt: String,
    username:String,
});

const productSchema=mongoose.Schema({
    productType : String,
    name : String,
    brand : String,
    price : Number,
    isSale : {
        status : Boolean,
        percent :Number 
    },
    stock : Number,
    screenSize : String,
    color : String,
    features : String,
    images : [String],
    description : [ String],
    detail : {
        
        itemWeight : String,
        modelName : String, 
        os :String, 
        manufacturer :String,
        releaseDate : String,
       
    },
    buyCounts : Number,
    viewCounts : Number,
    comment : [commentSchema]
})

const Product=mongoose.model('product',productSchema,'products')

module.exports=Product