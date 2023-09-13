const knex = require("../db/connection");

// Retrieve a list of all tables, ordered by table_name.
function list() {
  return knex("tables").select("*").orderBy("tables.table_name");
}

// Create a new table and return the newly created table object.
function create(table) {
  return knex("tables")
    .insert(table)
    .returning("*")
    .then((newTables) => newTables[0]);
}

// Read a specific table by its table_id.
function read(table_id) {
  return knex("tables").select("*").where({ table_id }).first();
}

module.exports = { list, create, read };
