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
    storedSocketId = socket.id;
  }
  console.log(`User ${storedSocketId} connected`);

  let user = users.find((user) => user.userId === storedSocketId);
  if (!user) {
    user = {
      userId: storedSocketId,
    };
    users.push(user);
  }

  socket.on("messageToServer", (message) => {
    io.emit("messageToClient", user.userId, message);
  });

  socket.on("typing", () => {
    socket.broadcast.emit("user typing", "typing...");
  });
  socket.on("stopped typing", () => {
    socket.broadcast.emit("user stopped typing");
  });
  socket.on("disconnect", () => {
    users = users.filter((user) => user.userId !== storedSocketId);
    console.log(`User ${storedSocketId} disconnected`);
  });
});
