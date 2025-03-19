import { Server } from "socket.io";

const io = new Server(4000, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// console.log(io);
// io.on("connection", (socket) => {
//   console.log("connected");

//   socket.on("message1", (msg) => {
//     console.log(`Received message: ${msg}`);
//     io.emit("message", `${msg}`);
//   });
//   socket.on("message", (msg) => {
//     console.log(`This is a msg: ${msg}`);
//     io.emit("message", `${msg}`);
//   });
// });

io.on("connection", (socket) => {
  socket.on("hiEvent", () => {
    io.emit("event");
    io.emit("hi");
  });
  socket.on("byeEvent", () => {
    io.emit("bye");
  });
});

io.on("disconnect", () => {
  console.log("Client disconnected");
});
