const express = require('express');
const app = express();
const server = require('http').Server(app);
const { v4: uuidv4 } = require('uuid');
const io = require('socket.io')(server);

// renders ejs file.
app.set('view engine', 'ejs');

// Tell server to grab where the javascript files are going to live
app.use(express.static('public'))

app.get('/', (req, res) => {
   res.redirect(`/${uuidv4()}`);  
});

app.get('/:room', (req, res) => {
    res.render('room', { roomId: req.params.room})
});

io.on('connection', socket => {
    socket.on('join-room', (roomId) => {
        console.log('room id', roomId);
        socket.join(roomId);

        // Broadcasts to other user instances that a user has joined.
        socket.to(roomId).broadcoast.emit('user-connected');
    })
})

server.listen(5000);