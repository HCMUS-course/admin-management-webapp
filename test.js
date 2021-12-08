


const goiChoThienDeTimSdt=()=>{
    console.log("hoi thien de tim so dien thoai");
    console.log('thien dang tim ...');
    
   const PromiseTimSdt=new Promise((resolve,reject)=>{
    setTimeout(()=>{
        const timDc=true
        if(timDc){
            console.log("co roi!");
            const number=123;
            // console.log(`so dien thoai la ${number}`);
            resolve(number)
        }
       
    },5000)

})
    // console.log("dong nay chay trc cai promise");
    return PromiseTimSdt
}


const timSdt=async()=>{
    let number =await goiChoThienDeTimSdt()
    return number
}


const ruDiChoiMaQuenSdt=async()=>{
    // const sdt=await timSdt()
    // console.log('vay so dien thoai de ru di choi la',sdt,"type",typeof(std));

    timSdt().then((sdt)=>{
        console.log('vay so dien thoai la',sdt);
    })
}

ruDiChoiMaQuenSdt()
console.log("dong nay chay trc ca dam");