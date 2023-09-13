// This seed file is responsible for populating the "reservations" table with data.
const reservations = require("./00-reservations.json");

exports.seed = function (knex) {
  // Truncate the "reservations" table and reset the identity column.
  return knex
    .raw("TRUNCATE TABLE reservations RESTART IDENTITY CASCADE")
    .then(function () {
      // Insert data from the JSON file into the "reservations" table.
      return knex("reservations").insert(reservations);
    });
};
