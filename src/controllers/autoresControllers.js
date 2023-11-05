const authorModel = require("../models/autorModel");
const postModel = require("../models/postModel");

// GET
const getAllAuthors = async (req, res) => {
  try {
    const result = await authorModel.getAllAuthors();
    res.json(result[0]);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const getAuthorById = async (req, res) => {
  try {
    const [result] = await authorModel.selectAuthorById(req.params.authorId);
    if (result[0] === undefined) {
      res.json({});
    } else {
      res.json(result[0]);
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

// CREATE
const createAuthor = async (req, res) => {
  try {
    const [insertResult] = await authorModel.createAuthor(req.body);
    const [result] = await authorModel.selectAuthorById(insertResult.insertId);
    res.json(result[0]);
  } catch (error) {
    res.json({ error: error.message });
  }
};

// UPDATE
const updateAuthorById = async (req, res) => {
  try {
    const { authorId } = req.params;
    const [author] = await authorModel.selectAuthorById(authorId);
    if (req.body.name === undefined) {
      req.body.name = author[0].name;
    }
    if (req.body.email === undefined) {
      req.body.email = author[0].email;
    }
    if (req.body.image === undefined) {
      req.body.image = author[0].image;
    }
    const [result] = await authorModel.updateAuthorById(authorId, req.body);
    res.json(result);
  } catch (error) {
    res.json({ error: error.message });
  }
};

// DELETE
const deleteAuthorById = async (req, res) => {
  try {
    const { authorId } = req.params;
    const deletedPosts = await postModel.deletePostsByAuthorId(authorId);
    console.log(deletedPosts);
    const [result] = await authorModel.deleteAuthorById(authorId);
    res.json(result);
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = {
  createAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthorById,
  deleteAuthorById,
};
