const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatroomSchema = new Schema({
  roomName: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^[A-Za-z]+$/.test(v); // Only allows alphabets
      },
      message: (props) =>
        `${props.value} is not a valid chatroom name! Only alphabets are allowed.`,
    },
    set: function (v) {
      return v.toLowerCase(); // Convert to lowercase for consistency
    },
  },
  topics: [{ type: String, required: true }],
});

module.exports = mongoose.model("Chatroom", chatroomSchema);
