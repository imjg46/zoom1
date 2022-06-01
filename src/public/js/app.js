const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");

room.hidden = true;

let roomName;

function addMessage(msg){
    const ul = room.querySelector("ul");
    const li = document.createElement("li");
    li.innerText = msg;
    ul.appendChild(li);
}

function showRoom(){
    welcome.hidden = true;
    room.hidden = false;
    const h2 = room.querySelector("h2");
    h2.innerText = `Room ${roomName}!`;
    const msgForm = room.querySelector("#msg");
    const nickForm = room.querySelector("#nick");
    msgForm.addEventListener("submit", handleMessageSubmit);
    nickForm.addEventListener("submit", handleNickSubmit);
}

function handleNickSubmit(e){
    e.preventDefault();
    const input = room.querySelector("#nick input");
    const inputvalue = input.value;
    socket.emit("nick_change", inputvalue);
    //input.value = "";
}

function handleMessageSubmit(e){
    e.preventDefault();
    const input = room.querySelector("#msg input");
    const inputvalue = input.value;
    socket.emit("new_message", input.value, roomName, () => {
        addMessage(`You: ${inputvalue}`);
    });
    input.value = "";
}

function handleRoomSubmit(e){
    e.preventDefault();
    const input = form.querySelector("input");
    socket.emit("enter_room", input.value, showRoom);
    roomName = input.value;
    input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);

socket.on("userjoined", (userName) => {
    addMessage(`${userName} joined.`);
});

socket.on("userleft", (userName) => {
    addMessage(`${userName} left.`);
});

socket.on("new_message", addMessage);