var express = require("express");
var path = require("path");
var app = express();
var socket = require('socket.io')

var PORT = 8080;

var server = app.listen(PORT, function(){
    console.log("Server listening on: http://localhost:" + PORT)
});

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "/public/home.html"));
});

app.get("/about", function (req, res){
    res.sendFile(path.join(__dirname, "/public/about.html"));

})

app.get("/contact", function (req, res){
    res.sendFile(path.join(__dirname, "/public/contact.html"));
   
   
})


    
var io = socket(server);

    io.on('connection', function(socket){
        console.log('made socket connection', socket.id);
        
        socket.on('chat', function(data){
io.sockets.emit('chat', data);
        })

        socket.on('typing', function(data){
            socket.broadcast.emit('typing', data);
        })
    })



