// This migration file is creating a new "tables" table.
exports.up = function (knex) {
    return knex.schema.createTable("tables", (table) => {
      // Create an auto-incrementing primary key column called "table_id".
      table.increments("table_id").primary();
  
      // Create a column for the table name.
      table.string("table_name");
  
      // Create a column for the table's capacity.
      table.string("capacity");
  
      // Create an unsigned integer column "reservation_id" for referencing reservations.
      table.integer("reservation_id").unsigned();
  
      // Create a foreign key constraint to reference the "reservation_id" column in the "reservations" table.
      table.foreign("reservation_id").references("reservation_id").inTable("reservations");
  
      // Create timestamp columns "created_at" and "updated_at" for tracking creation and update times.
      table.timestamps(true, true);
    });
  };
  
  // This is the rollback operation for the previous migration.
  exports.down = function (knex) {
    return knex.schema.dropTable("tables");
  };
  