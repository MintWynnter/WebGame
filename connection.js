

const hostButton = document.getElementById("hostButton");
const joinButton = document.getElementById("joinButton");

function gotoRoomHost(){
    var uname = document.getElementById('uname-enter').value;
    if(uname === ""){
        return;
    }
    var url = "room.html?username=" + uname
    window.location.href = url; // Path relative to index.html
}

function joinPeer(){
    var uname = document.getElementById('uname-enter').value;
    if(uname === ""){
        return;
    }
    var id = document.getElementById('peer-id-enter').value;
    var url = "room.html?id=" + id + "&uname=" + uname
    window.location.href = url; // Path relative to index.html
}

hostButton.addEventListener("click", gotoRoomHost);
joinButton.addEventListener("click", joinPeer);

