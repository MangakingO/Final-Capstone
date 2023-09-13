// This migration file is altering the "reservations" table to add a "status" column.
exports.up = function (knex) {
    return knex.schema.alterTable("reservations", (table) => {
      // Add a new "status" column with a default value of "booked".
      table.string("status").defaultTo("booked").notNullable().index();
    });
  };
  
  // This is the rollback operation for the previous migration.
  exports.down = function (knex) {
    return knex.schema.alterTable("reservations", (table) => {
      // Drop the "status" column, reverting the changes made in the "up" migration.
      table.dropColumn("status");
    });
  };
  