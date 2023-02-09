const router = require("express").Router();
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodsNotAllowed");

router
    .route("/:reviewId")
    .delete(controller.delete)
    .put(controller.update)
    .all(methodNotAllowed)
router
  .route("/").get(controller.readReviews).all(methodNotAllowed)

module.exports = router