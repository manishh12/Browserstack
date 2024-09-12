const express=require('express');
const Filelog=require('./logfile');
const http=require('http');
const socketIo=require('socket.io');




const app= express();
const server = http.createServer(app);
const io = socketIo(server);
const filelog= new Filelog('test.log');

filelog.start();

app.use(express.static(__dirname+'/Public'));


app.get('/log',(req,res)=>{
     res.send(filelog.getlogs());
});

io.on('connection',(socket)=>{
    console.log('New client Connected');
    socket.emit('logs',filelog.getlogs());
    filelog.on('process',(lines)=>{
     socket.emit('update',lines);
    });
    socket.on('Disconnect',()=>{
        console.log('Disconnected');
    });

});


const PORT=3000;
server.listen(PORT, () => {
    console.log(`App listening at ${PORT}`);
  });
