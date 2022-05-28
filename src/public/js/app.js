const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");

const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", (open) => { //BackEnd와 연결될때
    console.log("✅ Connected to server!");
});

socket.addEventListener("message", async (event) => { //BackEnd에서 메시지 올때
    console.log("💌 MSG: " + await event.data.text());
    //ws버전8되면서,    https://nomadcoders.co/noom/lectures/3091
});

socket.addEventListener("close", (close) => { //BackEnd와 연결 끊길때
    console.log("❌ Disconnected from server!");
});

// setTimeout(() => {
//     socket.send("hello from browser!"); //메시지 BackEnd로 보내기
// }, 5000)

function handleSumbit(event){
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(input.value);
    input.value = "";
}

messageForm.addEventListener("submit", handleSumbit);