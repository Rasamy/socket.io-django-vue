const Express = require("express")();
const Http = require("http").Server(Express);
const Socketio = require("socket.io")(Http, {
  cors: {
    origin: "*",
  },
});
//inputting our position values 
let position = {
  x: 200,
  y: 200,
};

// let posts = [
//   {
//       "id": 3,
//       "title": "test 3 updated",
//       "description": "famoronana 3 updated",
//       "author": 1
//   },
//   {
//       "id": 10,
//       "title": "andrana",
//       "description": "description",
//       "author": 1
//   },
//   {
//       "id": 11,
//       "title": "izy",
//       "description": "mety dscription",
//       "author": 1
//   },
// ]
// let posts = {}
//connection to emit the positions to all connected clients 
Socketio.on("connection", (socket) => {
    socket.emit("position", position);
  //connection to the move buttons and method to send back conditions to perform 
    socket.on("move", (data) => {
      switch (data) {
        case "left":
          position.x -= 5;
          Socketio.emit("position", position);
          break;
        case "right":   
          position.x += 5;
          Socketio.emit("position", position);
          break;
        case "up":
          position.y -= 5;
          Socketio.emit("position", position);
          break;
        case "down":
          position.y += 5;
          Socketio.emit("position", position);
          break;
      }
    });

    socket.on('add-post', (data)=> {
      socket.emit('ticket',data)
      socket.broadcast.emit('ticket',data)
    })

    socket.on('edit-post', (data)=> {
      socket.emit('ticket-edited',data)
      socket.broadcast.emit('ticket-edited',data)
    })

    socket.on('remove-post', (data)=> {

      socket.emit('ticket-removed',data)
      socket.broadcast.emit('ticket-removed',data)
    })


    // Liste tache atelier

    socket.on('change-status', (data)=> {
      socket.emit('list-changed',data)
      socket.broadcast.emit('list-changed',data)
    })

  });

//listening to a PORT 
Http.listen(3000, () => {
  console.log("Server up and running...");
});