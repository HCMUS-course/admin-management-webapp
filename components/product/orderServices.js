const order=require('./orderModel')


module.exports.findAllOrder =()=>{
   return order.find();
}

module.exports.getNumberOfOrder=()=>{
  
    return order.countDocuments();
    
 }

 module.exports.updateStatus = async (a) =>{
    const ord = await order.find();
    var status = "";
    for(i = 0 ; i < ord.length ;i++){
      for (j = 0; j<ord[i].items.length; j++){
          if(ord[i].items[j].id == a){
             if(ord[i].items[j].status == "preparing"){
                status = "shipping"
             }
             else if(ord[i].items[j].status == "shipping"){
                 status = "arrived"
             }
             else if(ord[i].items[j].status == "arrived"){
               status = "preparing"
           } 
             return order.updateOne({id : ord[i].id}, {"$set" : {"items.$[elemX].status" : status}}, {"arrayFilters" :[{"elemX._id" : a}]} )
          }
      }
  }
    return  order.findOne({items: {id :{a}} })
 }