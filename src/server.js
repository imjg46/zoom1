//WebSocket -> Socket.IO
import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";
const __dirname = path.resolve();
const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/src/views"); //src지워줘야 할수도 있음
app.use("/public", express.static(__dirname + "/src/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/")); // example.com/abc 접속시, example.com으로 이동

const httpServer = http.createServer(app); //HTTP SERVER
const wsServer = new Server(httpServer); //Socket.IO

wsServer.on("connection", socket => {
    socket["nickname"] = "Anonymous";
    socket.on("enter_room", (roomName, done) => {
        socket.join(roomName);
        done();
        socket.to(roomName).emit("userjoined", socket.nickname);
        //console.log(`Entered Room: ${socket.rooms.toString()}`);
    });
    socket.on("disconnecting", () => { //disconnect X (disconnecting = 연결이 끊어지려고 할때/ 끊어지진 않음. ex창 닫음)
        socket.rooms.forEach((room) => 
            socket.to(room).emit("userleft", socket.nickname));
    });
    socket.on("new_message", (msg, roomName, done) => {
        socket.to(roomName).emit("new_message", `${socket.nickname}: ${msg}`);
        done();
    });
    socket.on("nick_change", (nickName) => socket["nickname"] = nickName    );
});//////wsServer.on [END]//////

const handleListen = () => console.log(`😀 Listening on http://localhost:3000`);
httpServer.listen(3000, handleListen);