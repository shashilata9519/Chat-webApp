const Server = require("./src/server");

const server = new Server().app;

const http = require("http");
const listner = http.createServer(server);
// const io = require("socket.io")(serverWithSocket);
// const io = new Sr(listner, {cors: {
//   origin: "http://localhost:3000"
// }});

const port = 4000;
let users = [];
const serverWithSocket = server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
const io = require("socket.io")(serverWithSocket);

// server.listen(port, () => {
//   console.log(`server is working on port ${port} `);
// });

io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("message", (data) => {
    io.emit("messageResponse", data);
  });

  //Listens when a new user joins the server
  socket.on("newUser", (data) => {
    //Adds the new user to the list of users
    users.push(data);
    console.log(users, "user");
    //Sends the list of users to the client
    io.emit("newUserResponse", users);
  });

  socket.on("typing", (data) => socket.broadcast.emit("typingResponse", data));

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
    //Updates the list of users when a user disconnects from the server
    users = users.filter((user) => user.socketID !== socket.id);
    console.log(users, "msg");
    //Sends the list of users to the client
    io.emit("newUserResponse", users, "nnn");
    socket.disconnect();
  });
});
