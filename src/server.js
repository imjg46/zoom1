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


const handleListen = () => console.log(`😀 Listening on http://localhost:3000`);
httpServer.listen(3000, handleListen);