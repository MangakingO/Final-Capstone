const { select } = require("../db/connection");
const knex = require("../db/connection");

// Retrieve a list of reservations excluding 'finished' and 'cancelled' ones, ordered by reservation_date.
function list() {
  return knex("reservations")
    .select("*")
    .whereNotIn("status", ["finished", "cancelled"])
    .orderBy("reservations.reservation_date");
}

// Create a new reservation and return the newly created reservation object.
function create(reservation) {
  return knex("reservations as r")
    .insert(reservation)
    .returning("*")
    .then((newReservation) => newReservation[0]);
}

// Retrieve a list of reservations for a specific date excluding 'finished' and 'cancelled' ones, ordered by reservation_time.
function listByDate(reservation_date) {
  return knex("reservations")
    .select("*")
    .where({ reservation_date })
    .whereNotIn("status", ["finished", "cancelled"])
    .orderBy("reservations.reservation_time");
}

// Read a specific reservation by its ID.
function read(reservation_id) {
  return knex("reservations").select("*").where({ reservation_id }).first();
}

// Update the status of a reservation and return the updated reservation object.
function update(reservation_id, status) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id })
    .update({ status })
    .returning("*")
    .then((updated) => updated[0]);
}

// Finish a reservation by updating its status to 'finished'.
function finish(reservation_id) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id })
    .update({ status: "finished" });
}

// Search for reservations by mobile number, ignoring non-digit characters, and order them by reservation_date.
function search(mobile_number) {
  return knex("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
}

// Modify an existing reservation with a given ID and return the updated reservation object.
function modify(reservation_id, reservation) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id })
    .update(reservation, "*")
    .returning("*")
    .then((updated) => updated[0]);
}

module.exports = {
  list,
  create,
  listByDate,
  read,
  finish,
  update,
  search,
  modify,
};
