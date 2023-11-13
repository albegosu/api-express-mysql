const router = require("express").Router();
const AuthorsController = require("../../controllers/autoresControllers");
const AuthorMiddlewares = require("../../middlewares/autoresMiddlewares");

router.get("/", AuthorsController.getAllAuthors);
router.get("/:authorId", AuthorMiddlewares.checkIdIsNumeric, AuthorsController.getAuthorById);
router.post("/", AuthorMiddlewares.checkAuthorBody, AuthorsController.createAuthor);
router.put("/:authorId", AuthorMiddlewares.checkIdIsNumeric, AuthorMiddlewares.checkAuthorId, AuthorMiddlewares.checkAuthorBodyUpdate, AuthorsController.updateAuthorById);
router.delete("/:authorId", AuthorMiddlewares.checkIdIsNumeric, AuthorMiddlewares.checkAuthorId, AuthorsController.deleteAuthorById);

module.exports = router;
