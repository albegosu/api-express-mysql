const router = require("express").Router();
const AuthorsController = require("../../controllers/autoresControllers");
const AuthorMiddlewares = require("../../middlewares/autoresMiddlewares");

// GET
router.get("/", AuthorsController.getAllAuthors);
router.get("/:authorId", AuthorMiddlewares.checkIdIsNumeric, AuthorsController.getAuthorById);

// CREATE
router.post("/", AuthorMiddlewares.checkAuthorBody, AuthorsController.createAuthor);

// UPDATE
router.put("/:authorId", AuthorMiddlewares.checkIdIsNumeric, AuthorMiddlewares.checkAuthorId, AuthorMiddlewares.checkAuthorBodyUpdate, AuthorsController.updateAuthorById);

// DELETE
router.delete("/:authorId", AuthorMiddlewares.checkIdIsNumeric, AuthorMiddlewares.checkAuthorId, AuthorsController.deleteAuthorById);

module.exports = router;
