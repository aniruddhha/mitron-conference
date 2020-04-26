var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

io.on('connection', socket => {
    socket.on('room_join_request', payload => {
        socket.join(payload.roomName, err => {
            if (!err) {
                io.in(payload.roomName).clients((err, clients) => {
                    if (!err) {
                        io.in(payload.roomName).emit('room_users', clients)
                    }
                });
            }
        })
    })

    socket.on("offer_signal", payload => {
        // console.log(`offer_signal`)
        // console.log(payload)
        // console.log(`________________`)
        io.to(payload.calleeId).emit('offer', { signalData: payload.signalData, callerId: payload.callerId });
    });

    socket.on("answer_signal", payload => {
        // console.log(`answer_signal`)
        // console.log(payload)
        // console.log(`________________`)
        io.to(payload.callerId).emit('answer', { signalData: payload.signalData, calleeId: socket.id });
    });

    socket.on('disconnect', () => {
        console.log(socket.id)
        io.emit('signal', { type: 'disconnected', socketId: socket.id })
    })
});

http.listen(port, () => console.log('listening on *:' + port)); 