const router = require("express").Router();
const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./tables.controller");
const seatRouter = require("../seat/seat.router");

// Use the seatRouter as a sub-router for seat-related routes.
router.use("/:table_id/seat", seatRouter);

// Define routes for table management.

// GET route to list all tables.
// POST route to create a new table.
// All other HTTP methods are not allowed and will result in a methodNotAllowed error.
router
  .route("/")
  .get(controller.list)
  .post(controller.create)
  .all(methodNotAllowed);

module.exports = router;
