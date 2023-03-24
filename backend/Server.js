const express = require("express");
const mongoose = require('mongoose');
//7-Import body-parser library
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const RoomRoutes = require("./routes/CreateRoom");
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods : ['GET', 'POST']
    }
})


//create socket connection
io.on("connection", (socket) => {
    console.log('made socket connection', socket.id);
    socket.emit('me', socket.id);

    socket.on('disconnect', () => {
        socket.broadcast.emit('callEnded');
    })

    socket.on('callUser', (data) => {
        io.to(data.userToCall).emit('callUser', { signal: data.signalData, from: data.from, name: data.name });
    })

    socket.on('answerCall', (data) => { 
        io.to(data.to).emit('callAccepted', data.signal);
    })
})

//8-app middleware
app.use(bodyParser.json());
app.use(cors());

//9-Route middleware
app.use(RoomRoutes);

//5-Database connection
const DB_URL = 'mongodb+srv://viduraitexphere:mypass123@web-rtc-app.10ydvu6.mongodb.net/?retryWrites=true&w=majority'

const PORT = process.env.PORT || 5000;




mongoose.connect(DB_URL)
    .then(()=>{
        console.log('MongoDB connected');
    })
    .catch((err)=>{
        console.log('MongoDB connection error: ', err);
    });


// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
server.listen(5000, () => console.log(`server is running on port ${PORT}`));
