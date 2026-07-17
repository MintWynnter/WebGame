

const button = document.getElementById("hostButton");

let peer;
let conn;

function makeID(peer){
    // Create a random PeerJS ID
    peer = new Peer();

    peer.on('open', (id) => {
        document.getElementById('peer-id').innerText = id;
        console.log('My peer ID is: ' + id);
    });
}

function joinPeer(conn){
    var id = document.getElementById('peer-id-enter').innerText;
    conn = peer.connect(id);
}

button.addEventListener("click", makeID);

if(peer){
    peer.on('connection', (conn) => {
        conn.on('data', (data) => {
            console.log('Received:', data);
        });
    });
}

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
