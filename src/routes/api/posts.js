const router = require("express").Router();

const PostsController = require("../../controllers/postsControllers");
const PostsMiddlewares = require("../../middlewares/postsMiddlewares");
const AuthorsMiddlewares = require("../../middlewares/autoresMiddlewares");

// CREATE
router.post("/", PostsMiddlewares.checkPostBody, PostsController.createPost);

// GET
router.get("/", PostsController.getAllPosts);
router.get("/:postId", PostsMiddlewares.checkIdIsNumeric, PostsController.getPostById);
router.get("/byAuthorId/:authorId", AuthorsMiddlewares.checkIdIsNumeric, AuthorsMiddlewares.checkAuthorId, PostsController.getPostByAuthorId);

// UPDATE
router.put("/:postId", PostsMiddlewares.checkIdIsNumeric, PostsMiddlewares.checkPostBody, PostsMiddlewares.checkPostId, PostsController.updatePostById);

// DELETE
router.delete("/:postId", PostsMiddlewares.checkIdIsNumeric, PostsMiddlewares.checkPostId, PostsController.deletePostById);

module.exports = router;
