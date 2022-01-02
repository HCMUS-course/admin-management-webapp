const order=require('./orderModel')


module.exports.findAllOrder =()=>{
   return order.find();
}

module.exports.getNumberOfOrder=()=>{
  
    return order.countDocuments();
    
 }