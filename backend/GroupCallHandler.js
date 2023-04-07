const createPeerServerListners = (peerServer) => {
  peerServer.on("connection", (client) => {
    console.log("succesfully connecter to peer js server: ", client.id);
  });
};

module.exports = { createPeerServerListners };
