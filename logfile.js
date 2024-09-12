const fs=require('fs');
const events=require('events');


class logfile extends events.EventEmitter{
    constructor(filename){
        super();
        this.filename=filename;
        this.store=[];
        this.watch();
    }

    getlogs(){
        return this.store.slice(-10);
    }

     
    start(){
        fs.readFile(this.filename,'utf-8',(err,data)=>{
            if(err)throw err;

            const lin=data.trim().split('\n');
            
           lin.slice(-10);

        });
    }
     
    watch(){
        fs.watch(this.filename,(eventType,filename)=>{
            if(eventType=='change'){
                this.processFile();
            }
        });
    }
    processFile(){
        fs.readFile(this.filename,'utf-8',(err,data)=>{
            if(err)throw err;
            const lines=data.trim().split('\n');
            const newlines=lines.slice(-10);
            if(newlines.length!=this.store.length || !newlines.every((val,index)=>val===this.store[index])){
                this.store=newlines;
                this.emit('process',newlines);
            }
        });
    }

}

module.exports= logfile;


