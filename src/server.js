import express from "express";
import http from "http";
import WebSocket, {WebSocketServer}  from "ws";
import path from "path";
const __dirname = path.resolve();
const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/src/views"); //src지워줘야 할수도 있음
app.use("/public", express.static(__dirname + "/src/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/ *", (req, res) => res.redirect("/")); // example.com/abc 접속시, example.com으로 이동

const handleListen = () => console.log("😀 Listening on http://localhost:3000");
//app.listen(3000, handleListen); //express는 WebSocket지원 안함
const server = http.createServer(app); //HTTP SERVER
const wss = new WebSocketServer( { server } ); //WEBSOCKET SERVER + http서버와 같이 (항상 필요 x)

const sockets_ = [];

wss.on("connection", (socket) => { //FrontEnd와 연결될때
    sockets_.push(socket); //socket을 받을때 sockets[]에 넣기

    console.log("✅ Connected to browser!");

    socket.on("close", (socket) => { //FrontEnd와 연결 끊길때
        console.log("❌ Disconnected from browser!");
    });

    socket.on("message", (message) => { //FrontEnd로부터 메시지 올때
        //socket.send(message); //메시지 FrontEnd로 보내주기
        sockets_.forEach(aSocket => aSocket.send(message));
        //console.log("💌 MSG: " + message.toString());
    });

    //socket.send("hello"); //메시지 FrontEnd로 보내기
});

server.listen(3000, handleListen);