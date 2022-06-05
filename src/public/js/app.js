const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");
//const nickForm = room.querySelector("#nick");

room.hidden = true;

let roomName, nickName;

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
    h2.innerText = `${roomName} Room (${nickName})`;
    //const span = room.querySelector("span");
    //span.innerText `Nickname: ${nickName}`;
    const msgForm = room.querySelector("#msg");
    msgForm.addEventListener("submit", handleMessageSubmit);
}

// function handleNickSubmit(e){
//     e.preventDefault();
//     const input = welcome.querySelector("#nick input");
//     socket.emit("nick_change", input.value);
//     //input.value = "";
// }

function handleMessageSubmit(e){
    e.preventDefault();
    const input = room.querySelector("#msg input");
    const inputvalue = input.value;
    socket.emit("new_message", inputvalue, roomName, () => {   
        addMessage(`You: ${inputvalue}`);
    });
    input.value = "";
}

function handleRoomSubmit(e){
    e.preventDefault();
    const inputRoomName = form.querySelector("#roomname");
    const inputNickName = form.querySelector("#nickname");
    roomName = inputRoomName.value;
    nickName = inputNickName.value;
    //console.log(roomName+" / "+nickName);
    socket.emit("enter_room", roomName, nickName, showRoom);
    inputRoomName.value = "";
    inputNickName.value = "";
}

form.addEventListener("submit", handleRoomSubmit);

socket.on("userjoined", (userName) => {
    addMessage(`${userName} joined.`);
});

socket.on("userleft", (userName) => {
    addMessage(`${userName} left.`);
});

socket.on("new_message", addMessage);