const messageList = document.querySelector("ul");
const nickForm = document.querySelector("form#nick"); //#nick
const messageForm = document.querySelector("form#message"); //#message
const socket = new WebSocket(`ws://${window.location.host}`);

function makeMessage(type, payload){
    const msg = { type, payload };
    return JSON.stringify(msg); //JSObject를 String으로 변경
}

socket.addEventListener("open", (open) => { //BackEnd와 연결될때
    console.log("✅ Connected to server!");
    nickForm.querySelector("input").value = ""; //****왜그런진 모르겠는데 새로고침 하니까 입력창엔 뜨는데 적용은 안되서 이렇게 둠 ****/
});

// socket.addEventListener("message", async (event) => { //BackEnd에서 메시지 올때  // #1.8에서 안되서 바꿈
//     //console.log("💌 MSG: " + await event.data.text()); //ws버전8되면서,    https://nomadcoders.co/noom/lectures/3091
//     const li = document.createElement("li"); //메시지 화면에 표시
//     //li.innerText = await event.data.text();
//     li.innerText = "working";
//     messageList.append(li);
// });

socket.addEventListener("message", (message) => { //BackEnd에서 메시지 올때
    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.append(li);
  });

socket.addEventListener("close", () => { //BackEnd와 연결 끊길때
    console.log("❌ Disconnected from server!");
});

// setTimeout(() => {
//     socket.send("hello from browser!"); //메시지 BackEnd로 보내기
// }, 5000)

function handleMessageSumbit(event){ //메시지 전송 (=handleSubmit)
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(makeMessage("message", input.value));
    const li = document.createElement("li"); //내가 보낸 메시지만 다르게 표시
    li.innerText = `YOU: ${input.value}`;
    messageList.append(li);
    input.value = "";
}

function handleNickSubmit(event){ //닉네임 변경
    event.preventDefault();
    const input = nickForm.querySelector("input");
    socket.send(makeMessage("nickname", input.value));
}

messageForm.addEventListener("submit", handleMessageSumbit);
nickForm.addEventListener("submit", handleNickSubmit);