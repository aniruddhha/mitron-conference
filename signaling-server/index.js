var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

io.on('connection', socket => {
    socket.on('handshake', handshakeSignal => {
        socket.join(handshakeSignal['roomName'], err => {
            if (!err) {
                io.in(handshakeSignal['roomName']).clients((err, clients) => {
                    console.log(clients)
                    if (!err) {
                        const signal = { ...handshakeSignal }
                        signal['type'] = 'room_joined'
                        signal['msg'] = `${handshakeSignal['userName']} has joined room ${handshakeSignal['roomName']}`
                        signal['participants'] = clients

                        io.in(handshakeSignal['roomName']).emit('signal', signal)
                    }
                });
            }
        })
    });

    socket.on('signal', signal => {
        io.in(handshakeSignal['roomName']).clients((err, clients) => {
            const copySignal = { ...signal }
            copySignal['participants'] = clients
            socket.to(signal['roomName']).emit('signal', copySignal)
        })
    })

    socket.on('disconnect', () => {
        console.log(socket.id)

        io.emit('signal', { type: 'disconnected', socketId: socket.id })
    })
});

http.listen(port, () => console.log('listening on *:' + port)); 