const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Only for authetication and only one user.
const UserSchema = new Schema({
  username: { type: String, maxlenght: 15, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('User', UserSchema);
