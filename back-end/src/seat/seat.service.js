const knex = require("../db/connection");

// Update the reservation assignment for a table in a transaction.
// This function updates the reservation status to "seated" and assigns a reservation
// to a table by updating the `reservation_id` of the table.
function update(table_id, reservation_id) {
  return knex.transaction(async (transaction) => {
    // Update the reservation status to "seated."
    await knex("reservations")
      .select("*")
      .where({ reservation_id })
      .update({ status: "seated" })
      .transacting(transaction);

    // Update the table's reservation_id with the provided reservation_id.
    return knex("tables")
      .select("*")
      .where({ table_id: table_id })
      .update({ reservation_id })
      .transacting(transaction)
      .then((updated) => updated[0]);
  });
}

module.exports = { update };
