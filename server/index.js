const epress = require('express');
const app = epress();
const bodyParser = require('body-parser');
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const userRoutes = require('./src/routes/user.routes');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors());



const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
    }
});

io.on("connection", (socket) => {
    console.log("User connected ", socket.id);

    socket.on('join_room', (data) =>{
        socket.join(data)
        console.log(`User with ID: ${socket.id} Join room ${data}`)
    });

    socket.on('send_message', (data) => {
        socket.to(data.room).emit("recieve_message", data)
    })


    socket.on('disconnect', () => {
        console.log("User Disconnect", socket.id);
    });

});


app.use('/api/user', userRoutes);


server.listen(3001, () => {
    console.log("SERVER RUNNING");
})