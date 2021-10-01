const router = require("express").Router();
const usesRouter = require("../uses/uses.router");
const methodNotAllowed = require("../methodNotAllowed");
const controller = require("./urls.controller");

router.route("/:urlId/uses", usesRouter);

router
  .route("/:urlId")
  .get(controller.read)
  .put(controller.update)
  .all(methodNotAllowed);

router
  .route("/")
  .post(controller.create)
  .get(controller.list)
  .all(methodNotAllowed);

module.exports = router;
