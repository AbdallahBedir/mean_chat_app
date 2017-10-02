var express     = require("express");
var http        = require("http");
var request     = require("request");
var path        = require("path");
var mongoose    = require('mongoose');
var bodyParser  = require('body-parser');
var cors        = require("cors");
var app         = require("express")();
var server      = http.createServer(app).listen(3000);
//var io          = require("socket.io")(server);
const rooms     = require('./routes/rooms');
const chat      = require("./routes/chat");

//mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/ng2-chat',{ useMongoClient: true, promiseLibrary: global.Promise })
    .then(()=>console.log(`Successful connection to chat database`))
    .catch((err)=>console.log(`Error while connecting to database chat`,err))

// On Connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database chat');
});
  
// On Error
mongoose.connection.on('error', (err) => {
    console.log('Database error: '+err);
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// Body Parser Middleware
app.use(bodyParser.json());

app.use(express.static('./public'));

app.use(cors());

// io.on("connection",(socket)=>{
//     //socket.broadcast.emit("message","User Connected");
//     socket.on("chat",(message)=>{
//         socket.broadcast.emit("message",message);
//     });
//     //socket.emit("message","Welcome to Cyper Chat");
// });

app.use('/api/rooms', rooms);

app.use('/api/chat', chat);

app.get("/api",(req,res)=>{
    res.json({
        success:true,
        body:"Welcome to cyber chat backend room"
    });
});

// request.get("http://localhost:3000/api/rooms/",(err,res)=>{
//     console.log(`res.body.data`,JSON.parse(res.body).data);
//     let rooms = JSON.parse(res.body).data;
//     rooms.forEach(function(room) {
//         io.on("connection",(socket)=>{
//             //socket.broadcast.emit("message","User Connected");
//             socket.on(room._id,(message)=>{
//                 socket.broadcast.emit(room._id,message);
//             });
//             //socket.emit("message","Welcome to Cyper Chat");
//         });     
//     });
// });

app.get("*",(req,res)=> {
    res.sendFile(path.join(__dirname,'public/index.html'));    
});
console.log(`Express is running on port 3000...`);