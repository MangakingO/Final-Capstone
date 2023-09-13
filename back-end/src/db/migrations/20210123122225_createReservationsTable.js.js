// This migration creates a new table named "reservations" to store reservation information.
exports.up = function (knex) {
  return knex.schema.createTable("reservations", (table) => {
    // Define the columns of the "reservations" table.
    
    // An auto-incrementing primary key for each reservation.
    table.increments("reservation_id").primary();
    
    // Columns for guest information.
    table.string("first_name");
    table.string("last_name");
    table.string("mobile_number");
    
    // Number of guests for the reservation.
    table.string("people");
    
    // Date and time of the reservation.
    table.date("reservation_date");
    table.time("reservation_time");
    
    // Automatic timestamps for creation and updates.
    table.timestamps(true, true);
  });
};

// This is the rollback operation for the previous migration.
exports.down = function (knex) {
  return knex.schema.dropTable("reservations");
};
//