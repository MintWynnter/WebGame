

const hostButton = document.getElementById("hostButton");
const joinButton = document.getElementById("joinButton");

function gotoRoomHost(){
    window.location.href = 'room.html'; // Path relative to index.html
}

function joinPeer(){
    var id = document.getElementById('peer-id-enter').innerText;
    window.location.href = ("room.html?id=".concat(id)); // Path relative to index.html
}

hostButton.addEventListener("click", gotoRoomHost);
joinButton.addEventListener("click", joinPeer);

