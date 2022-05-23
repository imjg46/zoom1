import express from "express";
import path from 'path';
const __dirname = path.resolve();

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/src/views");

const handleListen = () => console.log("http://localhost:3000");
app.listen(3000);