const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const cors = require('cors');
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));




io.on('connection', (socket) => {

    console.log('IO connected', socket.id);

    socket.on('ROOM_JOIN', (data) => {

        socket.join(data.roomId);

        rooms.get(data.roomId).get('users').set(socket.id, data.userName);

        const users = [...rooms.get(data.roomId).get('users').values()];

        io.in(data.roomId).emit('SET_USERS', users);

    });


    // 2 Выход из комнаты.
    socket.on('disconnect', () => {

        rooms.forEach(async (item, roomId) => {

            await item.get('users').delete(socket.id);

            const users = [...rooms.get(roomId).get('users').values()];

            io.in(roomId).emit('SET_USERS', users);

        });

    });


    // 3 Добавление сообщения
        socket.on('NEW_MESSAGE', ({roomId, userName, text}) => {

            const message = {text: text, user: userName}

            rooms.get(roomId).get('messages').push(message);

            socket.in(roomId).emit('SET_MESSAGES', message);

        });

});


const rooms = new Map();


app.get('/rooms/:id', (req, res) => {

    const roomId = req.params.id;

    const usersMess = {

        users: [...rooms.get(roomId).get('users').values()],
        messages: [...rooms.get(roomId).get('messages').values()],
    }

    res.json(usersMess);

});


app.put('/rooms', (req, res) => {

    const {roomId, userName} = req.body.form;

    // проверяем есть ли такая комната и если нет то создаем.
    if (!rooms.has(roomId)) {
        rooms.set(roomId, new Map([
            ['users', new Map()],
            ['messages', []]
        ]))
    }

    res.json([...rooms.values()]);

});


server.listen(5000, () => console.log('Server started on port 5000'));
