// import { server as ws } from "websocket";
import http from "http";

import WebSocket from "websocket";
const WebSocketServer = WebSocket.server;
let connection = null;

const httpserver = http.createServer((req, res) => {
  res.end("Hello, this is response");
});

const ws = new WebSocketServer({
  httpServer: httpserver,
});

ws.on("request", (request) => {
  console.log("WS connection Request Received");
  connection = request.accept(null, request.origin);
  console.log("WS connection Request Accepted");

  connection.on("open", () => {
    console.log("opened");
  });
  connection.on("close", () => {
    console.log("closed");
  });

  connection.on("message", (message) => {
    console.log("extra line");
    console.log("from server:", message);
  });
});

httpserver.listen(3000, () => {
  console.log("Listening in SERVER");
});
