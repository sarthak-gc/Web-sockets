import { Server } from "socket.io";
const io = new Server(4999, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let users = [];

io.on("connection", (socket) => {
  let storedSocketId = socket.handshake.query.id;
  if (!storedSocketId || storedSocketId == "undefined") {
    console.log("HI there");
    storedSocketId = socket.id;
  }
  console.log(`User ${storedSocketId} connected`);

  let user = users.find((user) => user.userId === storedSocketId);
  if (!user) {
    user = {
      userId: storedSocketId,
      messages: [],
    };
    users.push(user);
  }
  socket.emit("previousMessages", user.messages);

  socket.on("messageToServer", (message) => {
    user.messages.push(message);
    console.log(user);
    const time = Date.now();
    io.emit("messageToClient", user.userId, message, time);
  });

  socket.on("typing", () => {
    console.log(socket);
    socket.broadcast.emit("user typing", "typing...");
  });
  socket.on("disconnect", () => {
    users = users.filter((user) => user.userId !== storedSocketId);
    console.log(`User ${storedSocketId} disconnected`);
  });
});

io.on("reconnect", () => {
  console.log("reconnected");
});
