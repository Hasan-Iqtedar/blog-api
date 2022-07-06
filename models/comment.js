const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  author_name: { type: String, required: true },
  text: { type: String, required: true },
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  date: { type: Date, require: true, default: new Date() },
});

module.exports = mongoose.model('Comment', CommentSchema);
