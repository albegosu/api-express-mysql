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
    return db.query("select * from autores where idautor = ?", [authorId]);
  };
  
  const getAllAuthors = () => {
    return db.query("select * from autores");
  };
  
  // UPDATE
  const updateAuthorById = (authorId, { name, email, image }) => {
    return db.query(
      "update autores set nombre = ?, email = ?, imagen = ? where idAutor = ?",
      [name, email, image, authorId]
    );
  };
  
  // DELETE
  const deleteAuthorById = (authorId) => {
    return db.query("delete from autores where idAutor = ?", [authorId]);
  };
  
  module.exports = {
    selectAuthorById,
    getAllAuthors,
    createAuthor,
    updateAuthorById,
    deleteAuthorById,
  };
  