const fs=require('fs');

setInterval(()=>{
    fs.appendFile('test.log',`New Entry added at ${new Date().tolocaleSrting()} \n`,(err)=>{
        if(err)throw err;
    });
},5000);