/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */
const router = require("express").Router();
const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./reservations.controller");

// Define routes for updating reservation status.
router
  .route("/:reservation_Id/status")
  .put(controller.update)
  .all(methodNotAllowed);

// Define routes for reading and modifying reservations.
router
  .route("/:reservation_Id")
  .get(controller.read)
  .put(controller.modify)
  .all(methodNotAllowed);

// Define routes for listing reservations and creating new ones.
router
  .route("/")
  .get(controller.list)
  .post(controller.create)
  .all(methodNotAllowed);

module.exports = router;
