const router = require("express").Router();

const PostsController = require("../../controllers/postsControllers");
const PostsMiddlewares = require("../../middlewares/postsMiddlewares");
const AuthorsMiddlewares = require("../../middlewares/autoresMiddlewares");

router.post("/", PostsMiddlewares.checkPostBody, PostsController.createPost);
router.get("/", PostsController.getAllPosts);
router.get("/:postId", PostsMiddlewares.checkIdIsNumeric, PostsController.getPostById);
router.get("/byAuthorId/:authorId", AuthorsMiddlewares.checkIdIsNumeric, AuthorsMiddlewares.checkAuthorId, PostsController.getPostByAuthorId);
router.put("/:postId", PostsMiddlewares.checkIdIsNumeric, PostsMiddlewares.checkPostBody, PostsMiddlewares.checkPostId, PostsController.updatePostById);
router.delete("/:postId", PostsMiddlewares.checkIdIsNumeric, PostsMiddlewares.checkPostId, PostsController.deletePostById);

module.exports = router;
