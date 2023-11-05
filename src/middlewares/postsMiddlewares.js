const PostModel = require("../models/postModel");

const checkPostId = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const result = await PostModel.selectPostById(postId);
    if (result[0].length === 0) {
      return res.json({ error: "El post no existe" });
    }
    next();
  } catch (error) {
    res.json({ error: error.message });
  }
};

const checkIdIsNumeric = (req, res, next) => {
  const { postId } = req.params;
  if (isNaN(postId)) {
    return res.json({ error: "El identificador pasado no es numérico" });
  }
  next();
};

function isValidDate(dateString) {
  const regExp = /^\d{4}-\d{2}-\d{2}$/;
  return regExp.test(dateString) && !isNaN(Date.parse(dateString));
}

const checkPostBody = (req, res, next) => {
  const body = req.body;
  try {
    if (typeof body.title !== "string" || body.title.length > 60) {
      return res.json({ error: "El título es incorrecto" });
    }
    if (typeof body.description !== "string" || body.description.length > 100) {
      return res.json({ error: "La descripción es incorrecta" });
    }
    if (!isValidDate(body.creation_date)) {
      return res.json({ error: "La fecha de creación es incorrecta" });
    }
    if (typeof body.category !== "string" || body.category.length > 20) {
      return res.json({ error: "La categoría es incorrecta" });
    }
    if (isNaN(body.author_id)) {
      return res.json({ error: "El id del autor es incorrecto" });
    }
  } catch (error) {
    return res.json({ error: error.message });
  }
  next();
};

module.exports = { checkPostId, checkIdIsNumeric, checkPostBody };
