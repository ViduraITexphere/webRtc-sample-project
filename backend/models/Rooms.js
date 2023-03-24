const mongoose = require('mongoose');

const RoomsSchema = new mongoose.Schema({
    roomName: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('Rooms', RoomsSchema);