const router = require("express").Router();

router.use("/posts", require("./api/posts"));
router.use("/autores", require("./api/autores"));

module.exports = router;
