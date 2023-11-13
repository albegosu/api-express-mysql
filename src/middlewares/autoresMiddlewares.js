const AuthorModel = require("../models/autorModel");

const checkAuthorId = async (req, res, next) => {
  try {
    const { authorId } = req.params;
    const result = await AuthorModel.selectAuthorById(authorId);
    if (result[0].length === 0) {
      return res.json({ error: "El autor no existe" });
    }
    next();
  } catch (error) {
    res.json({ error: error.message });
  }
};

const checkIdIsNumeric = (req, res, next) => {
  const { authorId } = req.params;
  if (isNaN(authorId)) {
    return res.json({ error: "El identificador pasado no es numérico" });
  }
  next();
};

function isValidURL(urlString) {
  try {
    const parsedURL = new URL(urlString);
    return parsedURL.protocol === "http:" || parsedURL.protocol === "https:";
  } catch (error) {
    return false;
  }
}

function isValidEmail(email) {
  const emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegExp.test(email);
}

const checkAuthorBody = (req, res, next) => {
  const body = req.body;
  if (typeof body.name !== "string" || body.name.length > 45) {
    return res.json({ error: "El nombre es incorrecto" });
  }
  if (!isValidEmail(body.email) || body.email.length > 45) {
    return res.json({ error: "La dirección de correo no es correcta" });
  }
  if (!isValidURL(req.body.image) || body.image.length > 200) {
    return res.json({ error: "La URL de la imagen no es correcta" });
  }
  next();
};

const checkAuthorBodyUpdate = (req, res, next) => {
  const body = req.body;
  if (body.name !== undefined && (typeof body.name !== "string" || body.name.length > 45)) {
    return res.json({ error: "El nombre es incorrecto" });
  }
  if (body.email !== undefined && (!isValidEmail(body.email) || body.email.length > 45)) {
    return res.json({ error: "La dirección de correo no es correcta" });
  }
  if (body.image !== undefined && (!isValidURL(body.image) || body.image.length > 100)) {
    return res.json({ error: "La URL de la imagen no es correcta" });
  }
  next();
};

module.exports = { checkAuthorId, checkAuthorBody, checkIdIsNumeric, checkAuthorBodyUpdate };
