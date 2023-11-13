// CREATE
const createPost = ({
    title,
    description,
    creation_date,
    category,
    author_id,
  }) => {
    return db.query(
      "insert into posts (titulo, description, fecha_creacion, categoria, autores_id_autores) values (?, ?, ?, ?, ?)",
      [title, description, creation_date, category, author_id]
    );
  };
  
  // GET
  const getAllPosts = () => {
    return db.query("select * from posts");
  };
  
  const getPostById = (postId) => {
    return db.query("select * from posts where id_post = ?", [postId]);
  };
  
  const getPostsByAuthorId = (authorId) => {
    return db.query("select pst.*, aut.nombre as nombre_autor, aut.email as email_autor, aut.imagen as imagen_autor from posts pst inner join autores aut on pst.autor_id = aut.idautor where pst.autor_id = ?", [authorId]);
  };
  
  // UPDATE
  const updatePostById = (postId, { title, description, creation_date, category, author_id }) => {
    return db.query(
      "update posts set titulo = ?, descripcion = ?, fecha_creacion = ?, categoria = ?, autores_id_autores = ? where id_post = ?",
      [title, description, creation_date, category, author_id, postId]
    );
  };
  
  // DELETE
  const deletePostById = (postId) => {
    return db.query("delete from posts where id_post = ?", postId);
  };
  
  const deletePostsByAuthorId = (authorId) => {
    return db.query("delete from posts where autores_id_autores = ?", [authorId]);
  };
  
  module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    getPostsByAuthorId,
    deletePostsByAuthorId,
    updatePostById,
    deletePostById,
  };
  