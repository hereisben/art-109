const allUsers = {}; // Keeps track of all users, active and inactive

module.exports = function (io) {
  io.on("connection", (socket) => {
    console.log("🔌 User connected:", socket.id);

    // Send all known users to the new user
    socket.emit("existing users", allUsers);

    // Receive new user data (cursor + identity)
    socket.on("cursor update", (data) => {
      allUsers[socket.id] = {
        ...data,
        lastSeen: Date.now(),
      };

      // Broadcast to others
      socket.broadcast.emit("cursor update", {
        id: socket.id,
        ...data,
      });
    });

    socket.on("whisper", (message) => {
      io.emit("whisper", {
        id: socket.id,
        text: message,
      });
    });

    socket.on("disconnect", () => {
      console.log("❌ User disconnected:", socket.id);
      // Do not delete from allUsers — ghosts remain
    });
  });

  // Clean up ghosts after 24 hours
  setInterval(() => {
    const now = Date.now();
    for (const id in allUsers) {
      if (now - allUsers[id].lastSeen > 0.1 * 60 * 60 * 1000) {
        delete allUsers[id];
      }
    }
  }, 10 * 60 * 1000); // every 10 minutes
};
