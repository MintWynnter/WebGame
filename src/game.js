let peer = null;
let connections = []; // Stores all active data connections
let isHost = false;
let myId = "";
let hostId = "";

const btnHost = document.getElementById('btn-host');
const btnJoin = document.getElementById('btn-join');
const displayId = document.getElementById('display-id');
const inputPeerId = document.getElementById('input-peer-id');
const statusMsg = document.getElementById('status-msg');

function initPeer() {
    peer = new Peer();

    peer.on('open', (id) => {
        myId = id;
        displayId.innerText = id;
    });

    // Listen for incoming connections (Used by Host, and by Clients connecting to peers)
    peer.on('connection', (conn) => {
        setupConnection(conn);
    });
}

// --- HOST LOGIC ---
btnHost.addEventListener('click', () => {
    isHost = true;
    hostId = myId;
    statusMsg.innerText = "Lobby created. Waiting for players...";
});

// --- CLIENT LOGIC ---
btnJoin.addEventListener('click', () => {
    hostId = inputPeerId.value.trim();
    if (!hostId) return;
    
    isHost = false;
    statusMsg.innerText = "Connecting to host...";
    
    // Connect directly to the host
    const conn = peer.connect(hostId);
    setupConnection(conn);
});

// --- CORE NETWORKING LOGIC ---
function setupConnection(conn) {
    // Prevent duplicate connections to the same peer
    if (connections.some(c => c.peer === conn.peer)) return;

    connections.push(conn);

    conn.on('open', () => {
        statusMsg.innerText = `Connected to peer: ${conn.peer}`;
        
        // If I am the host, tell this new player about everyone else, and tell everyone else about them
        if (isHost) {
            broadcastPeerList();
        }
    });

    conn.on('data', (data) => {
        handleNetworkData(data, conn.peer);
    });

    conn.on('close', () => {
        connections = connections.filter(c => c.peer !== conn.peer);
        statusMsg.innerText = `Player left. Total players: ${connections.length + 1}`;
    });
}

// Host tells everyone who is in the game
function broadcastPeerList() {
    const allPeerIds = connections.map(c => c.peer);
    
    // Broadcast the list of all connected clients to everyone
    broadcastPayload({
        type: 'PEER_LIST',
        peers: allPeerIds
    });
}

// Send data to EVERYONE in the network
function broadcastPayload(payload) {
    connections.forEach(conn => {
        if (conn.open) {
            conn.send(payload);
        }
    });
}

// Processing incoming messages
function handleNetworkData(data, senderPeerId) {
    switch (data.type) {
        case 'PEER_LIST':
            // Clients receive this from the host and connect to missing peers
            data.peers.forEach(id => {
                if (id !== myId && !connections.some(c => c.peer === id)) {
                    const conn = peer.connect(id);
                    setupConnection(conn);
                }
            });
            break;
            
        case 'PLAYER_MOVE':
            // Update the position of senderPeerId on your screen
            console.log(`Player ${senderPeerId} moved to`, data.position);
            break;
            
        default:
            console.log("Unknown packet type:", data.type);
    }
}

initPeer();
