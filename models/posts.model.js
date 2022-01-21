// Import mongoose
const mongoose = require("mongoose");

// Create schema for database entries (each document in db represents a blog post)
let postsSchema = mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  post: {
    type: String,
    required: true,
  },
});

// module.exports makes the model available outside of your module
module.exports = mongoose.model("posts", postsSchema);
