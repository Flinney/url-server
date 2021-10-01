const router = require("express").Router({ mergeParams: true });
const methodNotAllowed = require("../methodNotAllowed");

router.route("/").all(methodNotAllowed);

module.exports = router;
