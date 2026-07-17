
const params = new URLSearchParams(window.location.search);
var peer = new Peer();
peer.on('error', (err) => {
    console.error('Signaling server error:', err);
});
if(params.get('id')){
    document.getElementById('peer-id').innerText = params.get('id');
    peer.on('open', (id) => {
        console.log('My peer ID is: ' + id);
        // Safe to connect now
        var conn = peer.connect('destination-peer-id');
        conn.on("open", function () {
            // Receive messages
            console.log("Connected")
            conn.on("data", function (data) {
                console.log("Received", data);
            });

            // Send messages
            conn.send("Hello!");
        });
    });
}
else{
    peer.on('open', (id) => {
        document.getElementById('peer-id').innerText = id;
        console.log('Room ID: ' + id);
    });

    console.log("Listening");
    peer.on('connection', (conn) => {
        console.log("Connection");
        conn.on('data', (data) => {
            console.log('Received:', data);
        });
    });
}
