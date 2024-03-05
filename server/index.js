const express=require('express')
const app=express()
const mongoose=require('mongoose')
const cors = require('cors');
const userRoutes=require('./Routes/userRoutes')
const messageRoutes=require('./Routes/messageRoutes')
const socket = require("socket.io");
require("dotenv").config()
app.use(cors())
app.use(express.json())
app.use('/api/auth',userRoutes)
app.use('/api/messages',messageRoutes)
mongoose.connect(process.env.MONGO_DB)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error(error);
    });


const server=app.listen(process.env.PORT,()=>{
    console.log(process.env.PORT)
})
const io = socket(server, {
    cors: {
      origin: process.env.ORIGIN,
      credentials: true,
    },
  });
  
  global.onlineUsers = new Map();
  io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
      onlineUsers.set(userId, socket.id);
    });
  
    socket.on("send-msg", (data) => {
      const sendUserSocket = onlineUsers.get(data.to);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-recieve", data.msg);
      }
    });
  });
  