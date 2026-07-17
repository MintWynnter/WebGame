

const button = document.getElementById("hostButton");

function makeID(){
    // Create a random PeerJS ID
    const peer = new Peer();

    peer.on('open', (id) => {
        document.getElementById('peer-id').innerText = id;
        console.log('My peer ID is: ' + id);
    });
}

button.addEventListener("click", makeID);

// Listen for incoming data connections
/*peer.on('connection', (conn) => {
    conn.on('data', (data) => {
        console.log('Received:', data);
    });
});*/





var conn = peer.connect("dest-peer-id");