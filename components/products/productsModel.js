const mongoose=require("mongoose")


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
        itemDimensions : String,
        itemWeight : String,
        modelName : String,
        processor : String,
        graphicsCard : String,
        os :String,
        ram : String,
        storage : String,
        webcam : String,
        battery : String,
        powerAdapter : String,
        manufacturer :String,
        releaseDate : String
    },
    buyCounts : Number,
    viewCounts : Number,
    comment : {
        total : Number,
        items : [ 
            {
                name : String,
                content : String,
                date : String,
                rate : Number,
            }
        ]
    }
})

const Product=mongoose.model('product',productSchema,'product')

module.exports=Product