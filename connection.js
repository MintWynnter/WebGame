

const button = document.getElementById("hostButton");
let conn;

function gotoRoomHost(){
    window.location.href = 'room.html'; // Path relative to index.html
}

function joinPeer(conn){
    var id = document.getElementById('peer-id-enter').innerText;
    conn = peer.connect(id);
}

button.addEventListener("click", gotoRoomHost);


if(conn){
    conn.on("open", function () {
    // Receive messages
    conn.on("data", function (data) {
        console.log("Received", data);
    });

    // Send messages
    conn.send("Hello!");
    });
}
