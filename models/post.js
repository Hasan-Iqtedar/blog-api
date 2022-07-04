const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, requied: true },
  content: { type: String, requied: true },
  published: { type: Boolean, required: true, default: false },
});

PostSchema.virtual('publish-date').get(function () {
  return new Date();
});

module.exports = mongoose.model('Post', PostSchema);
