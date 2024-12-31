const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  username: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  chatroom: { type: String, required: true }, // Add chatroom reference
});

module.exports = mongoose.model("Message", messageSchema);
