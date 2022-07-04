const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  author_name: { type: String, required: true },
  text: { type: String, required: true },
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
});

CommentSchema.virtual('comment-date').get(function () {
  return new Date();
});

module.exports = mongoose.model('Comment', CommentSchema);
