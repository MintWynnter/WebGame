var peer = new Peer();

peer.on('open', (id) => {
    document.getElementById('peer-id').innerText = id;
    console.log('My peer ID is: ' + id);
});

console.log("Listening");
peer.on('connection', (conn) => {
    conn.on('data', (data) => {
        console.log('Received:', data);
    });
});