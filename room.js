
const params = new URLSearchParams(window.location.search);
if(params.get('id')){
    document.getElementById('peer-id').innerText = params.get('id');
    var peer = new Peer();
    var conn = peer.connect(params.get('id'));

    conn.on("open", function () {
    // Receive messages
    conn.on("data", function (data) {
        console.log("Received", data);
    });

    // Send messages
    conn.send("Hello!");
    });
}
else{
    var peer = new Peer();

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
