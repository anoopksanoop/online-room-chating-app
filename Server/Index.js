const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const port = 3001;
const { Server } = require('socket.io');
const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`User connected ${socket.id}`);

  socket.on('join_room', (room) => {
    socket.join(room);
    console.log(`User with ID: ${socket.id} joined room: ${room}`);
  });

  socket.on("send_message",(data)=>{
    console.log('Send message', data)
    socket.to(data.room).emit("receive_message",data)
  });

  socket.on('disconnect', () => {
    console.log('User Disconnect', socket.id);
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

