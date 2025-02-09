const express = require("express");
const { SerialPort } = require("serialport");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Listen to serial data from Arduino
let messageBuffer = ""; // A buffer to accumulate the incoming serial data

// Listen to serial data from Arduino
// port.on("data", (data) => {
//   const incomingData = data.toString(); // Convert buffer to string
//   messageBuffer += incomingData; // Append new data to the buffer

//   console.log("Received from Arduino:", incomingData);

//   // Check if the complete message is received
//   if (messageBuffer.includes("BUTTON_PRESSED")) {
//     console.log("Button Pressed Detected!");
//     io.emit("buttonPress", "Button was pressed!"); // Emit event to the frontend
//     messageBuffer = ""; // Clear the buffer after processing
//   }
// });

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
