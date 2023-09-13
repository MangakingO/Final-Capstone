const router = require("express").Router({ mergeParams: true });
const controller = require("./seat.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

// Define routes for seat assignment management.

// PUT route to update the seat assignment (assign a reservation to a table).
// DELETE route to unassign the seat (remove the reservation from a table).
// All other HTTP methods are not allowed and will result in a methodNotAllowed error.
router
  .route("/")
  .put(controller.update)
  .delete(controller.unassign)
  .all(methodNotAllowed);

module.exports = router;
