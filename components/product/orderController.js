const orderServices=require('./orderServices')
const orderController=require('./orderController')
module.exports.chartByDate = async ()=>{
     const order = await orderServices.findAllOrder()
     const num = await orderServices.getNumberOfOrder()
     var date = []
     var sale = []
    
     for(let i = 0; i < num; i++){
        order[i].items.forEach(element => {
            var tmp = element.orderDate.replaceAll('-','')
            if(date.indexOf(tmp) == -1){
                date.push(tmp)
                sale.push(element.cart.totalPrice)
            }
            else{
                const j = date.indexOf(tmp)
                sale[j] += element.cart.totalPrice
            }
          
        });
         
     }
    var list = [];
    for (var j = 0; j < date.length; j++) 
    list.push({'date': date[j], 'sale': sale[j]});

    list.sort(function(a, b) {
    return ((a.date < b.date) ? -1 : ((a.sale == b.sale) ? 0 : 1));
    });


    for (var k = 0; k < list.length; k++) {
    date[k] = list[k].date;
    sale[k] = list[k].sale;
    }
   
    var temp = []
    temp.push(date)
    temp.push(sale)
    return temp
}
module.exports.chartByMonth = async ()=>{
    const order = await orderServices.findAllOrder()
    const num = await orderServices.getNumberOfOrder()
    var date = []
    var sale = []
   
    for(let i = 0; i < num; i++){
       order[i].items.forEach(element => {
           var tmp = element.orderDate.replaceAll('-','')
           tmp = tmp.substr(0,6)
           if(date.indexOf(tmp) == -1){
               date.push(tmp)
               sale.push(element.cart.totalPrice)
           }
           else{
               const j = date.indexOf(tmp)
               sale[j] += element.cart.totalPrice
           }
         
       });
        
    }
   var list = [];
   for (var j = 0; j < date.length; j++) 
   list.push({'date': date[j], 'sale': sale[j]});

   list.sort(function(a, b) {
   return ((a.date < b.date) ? -1 : ((a.sale == b.sale) ? 0 : 1));
   });


   for (var k = 0; k < list.length; k++) {
   date[k] = list[k].date;
   sale[k] = list[k].sale;
   }
  
   var temp = []
   temp.push(date)
   temp.push(sale)
   return temp
}

module.exports.chartByYear = async ()=>{
    const order = await orderServices.findAllOrder()
    const num = await orderServices.getNumberOfOrder()
    var date = []
    var sale = []
   
    for(let i = 0; i < num; i++){
       order[i].items.forEach(element => {
           var tmp = element.orderDate.replaceAll('-','')
           tmp = tmp.substr(0,4)
           if(date.indexOf(tmp) == -1){
               date.push(tmp)
               sale.push(element.cart.totalPrice)
           }
           else{
               const j = date.indexOf(tmp)
               sale[j] += element.cart.totalPrice
           }
         
       });
        
    }
   var list = [];
   for (var j = 0; j < date.length; j++) 
   list.push({'date': date[j], 'sale': sale[j]});

   list.sort(function(a, b) {
   return ((a.date < b.date) ? -1 : ((a.sale == b.sale) ? 0 : 1));
   });


   for (var k = 0; k < list.length; k++) {
   date[k] = list[k].date;
   sale[k] = list[k].sale;
   }
  
   var temp = []
   temp.push(date)
   temp.push(sale)
   return temp
}
module.exports.chartTop10 = async ()=>{
    const order = await orderServices.findAllOrder()
    const num = await orderServices.getNumberOfOrder()
    var product = []
    var sale = []
    
    for(let i = 0; i < num; i++){
       order[i].items.forEach(element => {
           var tmp = element.cart.items
           tmp.forEach(e=>{
            var t = e.name
            var temp = t.concat('/')
            var name = '/'.concat(temp)
            
            if(product.indexOf(name) == -1){
                product.push(name)
                sale.push(1)
            }
            else{
                const j = product.indexOf(name)
                sale[j] += 1
            }
           })
           
         
       });
        
    }
   var list = [];
   for (var j = 0; j < product.length; j++) 
   list.push({'product': product[j], 'sale': sale[j]});

   list.sort(function(a, b) {
   return ((a.sale > b.sale) ? -1 : ((a.product == b.product) ? 0 : 1));
   });


   for (var k = 0; k < list.length; k++) {
    product[k] = list[k].product;
    sale[k] = list[k].sale;
   }
  
   var top10 = []
   if(product.length<=10){
      top10.push(product)
   }
   else{
       var name = []
       for( var i = 0 ; i<10;i++){  
        name.push(product[i])
       }
       top10.push(name)
   }
   
   top10.push(sale)
   return top10
}
module.exports.draw = async (res) =>{
    const byDate = await orderController.chartByDate()
    const byMonth = await orderController.chartByMonth()
    const byYear = await orderController.chartByYear()
    const top10 = await orderController.chartTop10()
    console.log(top10)
   
  
    res.render('Chart',{
        xValues : byDate[0],
        yValues : byDate[1],
        xValuesM : byMonth[0],
        yValuesM : byMonth[1],
        xValuesY : byYear[0],
        yValuesY : byYear[1],
        xtop10 : top10[0],
        ytop10 : top10[1]
        
    });
}