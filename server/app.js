const express = require('express')
const http = require('http')
const socketIo = require("socket.io")
const cors = require("cors")
const path = require("path");




//import controller
const userController = require("./controllers/userController");
const roomController = require("./controllers/roomController");
const messageController = require("./controllers/messageController");
// const message = require("./models/message");
const authentication = require("./middlewares/authentication");


const app = express()
const port = 3000

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//api route
app.post("/register", userController.register);
app.post("/login", userController.login);
app.use(authentication);

app.get("/rooms",roomController.readRoom)
app.post("/rooms",roomController.addRoom)
app.get("/rooms/:id",roomController.readRoomDetail)

app.get("/chat/:roomId", messageController.readMessage);
app.post("/chat/:roomId", messageController.createMessage);
io.on("connection", (socket) => {
  console.log(socket.id);
socket.emit("welcome","haalo")



  socket.on("join:room", (roomId) => {
    socket.join(roomId)
    console.log(roomId);




  


  })
  socket.on("message:new", ({ roomId, message }) => {
    if (roomId ||  message) {
      // Emit the new message to all clients in the specified roomId
      io.to(roomId).emit("message:update", {
        from: socket.handshake.auth.username || 'Anonymous',
        message
      });
      console.log(`Message from ${socket.handshake.auth.username || 'Anonymous'} in roomId ${roomId}: ${message}`);
    } else {
      console.log("Invalid message data received:", { roomId, message });
    }
  });

  if (socket.handshake.auth) {
    console.log("username :" + socket.handshake.auth.username);
  }
  return () => {
    socket.off("message:update")
    socket.disconnect()
  }
  // socket.on("")
})

// socket.on("message:new")

server.listen(port, () => {
  console.log(`http://localhost:${port}`);

})

