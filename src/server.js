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

const handleListen = () => console.log("^v^ Listening on http://localhost:3000");
//app.listen(3000, handleListen); //express는 WebSocket지원 안함
const server = http.createServer(app); //HTTP SERVER
const wss = new WebSocketServer( { server } ); //WEBSOCKET SERVER + http서버와 같이 (항상 필요 x)

function handleConnection(socket) {
    console.log(socket);
}

wss.on("connection", handleConnection);

server.listen(3000, handleListen);