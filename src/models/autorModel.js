// CREATE
const createAuthor = ({ name, email, image }) => {
    return db.query("insert into autores (nombre, email, imagen) values (?, ?, ?)", [
      name,
      email,
      image,
    ]);
  };
  
  // GET
  const selectAuthorById = (authorId) => {
    return db.query("select * from autores where id_autores = ?", [authorId]);
  };
  
  const getAllAuthors = () => {
    return db.query("select * from autores");
  };
  
  // UPDATE
  const updateAuthorById = (authorId, { name, email, image }) => {
    return db.query(
      "update autores set nombre = ?, email = ?, imagen = ? where id_autores = ?",
      [name, email, image, authorId]
    );
  };
  
  // DELETE
  const deleteAuthorById = (authorId) => {
    return db.query("delete from autores where id_autores = ?", [authorId]);
  };
  
  module.exports = {
    selectAuthorById,
    getAllAuthors,
    createAuthor,
    updateAuthorById,
    deleteAuthorById,
  };
  