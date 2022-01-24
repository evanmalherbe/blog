/* In this file, you will create all the code needed to perform CRUD operations using Mongoose. */

// Import posts model file
const Post = require("../models/posts.model.js");

// Add new post to collection
exports.create = function (req, res) {
  let postModel = new Post({
    author: req.body.author,
    title: req.body.title,
    post: req.body.post,
  });

  // Save new blog post to collection
  postModel.save(function (err, data) {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send({ message: "Some error occurred while adding blog post." });
    } else {
      console.log(data);
      res.send({ message: "The blog post has been added" });
    }
  });
};

// Retrieve all blog posts
exports.findAll = function (req, res) {
  Post.find({}, function (err, post) {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send({ message: "Some error occurred while retrieving blog posts." });
    } else {
      // Process result by pushing items to an array - separate arrays for blog titles, blog posts, blog authors and post id's
      let titlesArray = [];
      let postsArray = [];
      let postIdArray = [];
      let postAuthorArray = [];

      /* Learned to create array from mongoDB output here: 
      https://stackoverflow.com/questions/38997210/create-array-of-items-from-mongodb-node-js */

      post.forEach(function (result) {
        titlesArray.push(result.title);
      });

      post.forEach(function (result) {
        postsArray.push(result.post);
      });

      post.forEach(function (result) {
        postAuthorArray.push(result.author);
      });

      post.forEach(function (result) {
        postIdArray.push(result._id);
      });

      // Send arrays to frontend
      res.json({
        titles: `${titlesArray}`,
        posts: `${postsArray}`,
        ids: `${postIdArray}`,
        authors: `${postAuthorArray}`,
      });

      // End of if statement
    }
  });

  // End of findall function
};

// Delete list item (uses id to delete only one specific item)
exports.deletePost = function (req, res) {
  Post.findOneAndRemove({ _id: req.body.id }, function (err) {
    if (err) {
      console.log("ERROR: Post NOT removed. " + err);
      res.send({ message: "ERROR: Post NOT removed. " + err });
    }
    res.send({ message: "Blog post removed." });
  });
};