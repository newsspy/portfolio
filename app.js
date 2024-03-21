

var app = require('express')();
var http = require('http').Server(app);



var path = require('path');
const { Socket } = require('socket.io');
var io=require('socket.io')(http);


app.get('/', function(req,res){

    var option= {
        root:path.join(__dirname)
    }
    var fileName= 'index.html';
    res.sendFile(fileName,option);

});



// let code = '';

// io.on('connection', (socket) => {
//   console.log('User connected');

//   socket.on('setCode', (newCode) => {
//     if (newCode.length === 6) {
//       code = newCode;
//       socket.broadcast.emit('codeUpdated', { currentCode: code });
//       socket.emit('codeUpdated', { currentCode: code });
//       console.log('Current code:', code);
//     } else {
//       socket.emit('error', { message: 'Please enter a valid six-digit code.' });
//     }
//   });

  // socket.on('changeCodeAt', ({ index, newDigit }) => {
  //   if (index >= 0 && index < 6 && newDigit >= 0 && newDigit <= 9) {
  //     const updatedCode = code.split('');
  //     updatedCode[index] = newDigit;
  //     code = updatedCode.join('');

  //     socket.broadcast.emit('codeUpdated', { currentCode: code });
  //     socket.emit('codeUpdated', { currentCode: code });
  //     console.log('Current code:', code);
  //   } else {
  //     socket.emit('error', { message: 'Invalid input. Please enter a digit between 0 and 9.' });
  //   }
  // });

  // socket.on('disconnect', () => {
  //   console.log('User disconnected');
  // });
// });








var roomno=1;
var full=0;
let code = '';

io.on("connection",(socket)=>{

console.log('User Connected', socket.id);
// console.log('Id', socket.id);
// socket.emit('welcome', "you are new connected")
// event
// socket.on("message", data);
socket.join('room'+roomno);
io.sockets.in('room'+roomno).emit('connectedRoom', 'you are connect to room no'+roomno);


socket.on('user-code',(message)=>{
console.log(message);
// if message come send to all
io.emit('message',message);
})

// room limitations
full++;
if(full >=2){
  full=0;
  roomno++;
}

// enter your room code here


socket.on('setCode', (newCode) => {
  if (newCode.length === 6) {
    code = newCode;
    socket.broadcast.emit('codeUpdated', { currentCode: code });
    socket.emit('codeUpdated', { currentCode: code });
    console.log('Current code:', code);
  } else {
    socket.emit('error', { message: 'Please enter a valid six-digit code.' });
  }
})


socket.on('disconnect',function(){
  console.log('User Disconnected')
});

})

const port = process.env.PORT || 3000;
http.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


