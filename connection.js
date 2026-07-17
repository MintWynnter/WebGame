

const button = document.getElementById("hostButton");

function gotoRoomHost(){
    window.location.href = 'room.html'; // Path relative to index.html
}

function joinPeer(conn){
    var id = document.getElementById('peer-id-enter').innerText;
    window.location.href = "room.html?id="+id; // Path relative to index.html
}

button.addEventListener("click", gotoRoomHost);

