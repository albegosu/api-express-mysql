const PostModel = require("../models/postModel");
const AutorModel = require("../models/autorModel");

// GET
const getAllPosts = async (req, res) => {
  try {
    const [posts] = await PostModel.selectAllPosts();
    let result = [];
    for (let post of posts) {
      const [author] = await AutorModel.selectAuthorById(post.author_id);
      post.author = author[0];
      result.push(post);
    }
    res.json(result);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const { postId } = req.params;
    const [result] = await PostModel.selectPostById(postId);
    if (result[0] === undefined) {
      res.json({});
    } else {
      const author = await AutorModel.selectAuthorById(result[0].author_id);
      result[0].author = author[0];
      res.json(result[0]);
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

const getPostByAuthorId = async (req, res) => {
  try {
    const [authorId] = req.params.authorId;
    const [result] = await PostModel.selectPostsByAuthorId(authorId);
    res.json(result);
  } catch (error) {
    res.json({ error: error.message });
  }
};

// CREATE
const createPost = async (req, res) => {
  try {
    const [result] = await PostModel.insertPost(req.body);
    const [post] = await PostModel.selectPostById(result.insertId);
    res.json(post[0]);
  } catch (error) {
    res.json({ error: error.message });
  }
};

// UPDATE
const updatePostById = async (req, res) => {
  try {
    const { postId } = req.params;
    const [result] = await PostModel.updatePostById(postId, req.body);
    res.json(result);
  } catch (error) {
    res.json({ error: error.message });
  }
};

// DELETE
const deletePostById = async (req, res) => {
  try {
    const { postId } = req.params;
    const [result] = await PostModel.deletePostById(postId);
    res.json(result);
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  getPostByAuthorId,
  updatePostById,
  deletePostById,
};
