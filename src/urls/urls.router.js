const router = require("express").Router();
const usesRouter = require("../uses/uses.router");
const methodNotAllowed = require("../methodNotAllowed");

router.route("/:urlId/uses", usesRouter);

router.route("/");

module.exports = router;
