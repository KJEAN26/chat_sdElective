var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);


app.get('/', (req, res) => {
   res.sendFile(__dirname + '/index.html');
});

// io.on('connection', (socket) => {
//     console.log('a user connected');
//     socket.on('disconnect', () => {
//         console.log('user disconnected');
//       });
// });


io.on('connection', (socket) => {
   socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
   });

   // login
   socket.on('login', (data) => {
      io.emit('new login', {user: data, msg: `${data} has newly logged in say hi!`});
      console.log("login ", data)
      io.emit('login', data)
   });
});



// io.on('connection', function(socket) {
//     socket.on('send-nickname', function(nickname) {
//         socket.nickname = nickname;
//         users.push(socket.nickname);
//         console.log(users);
//     });
// })   
http.listen(3000, () => {
   console.log('listening on *:3000');
});

