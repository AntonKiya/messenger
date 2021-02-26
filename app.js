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



// принимаем с фронтенда сокет для подключения к серверу.
// здесь же будем имитить все события
io.on('connection', (socket) => {

    console.log('IO connected', socket.id);

    // При входе в комнату генерируем emit (App.js - onlogin).
    socket.on('ROOM:JOIN', (data ) => {
        console.log(data);
    });

});



const rooms = new Map();


app.get('/rooms', (req, res) => {
    res.json(rooms);
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

    console.log(rooms);

    res.json([...rooms.values()]);

    // res.json({message: 'ok'});
});


server.listen(5000, () => console.log('Server started on port 5000'));
