const { PORT = 5001 } = process.env;

// Import the Express application and the Knex database connection.
const app = require("./app");
const knex = require("./db/connection");

// Apply database migrations and start the server.
knex.migrate
  .latest()
  .then((migrations) => {
    console.log("Database migrations applied successfully:", migrations);

    // Start the server and listen on the specified port.
    app.listen(PORT, listener);
  })
  .catch((error) => {
    console.error("Error applying database migrations:", error);

    // Close the database connection in case of an error.
    knex.destroy();
  });

// Function to handle the server listening event.
function listener() {
  console.log(`Server is listening on Port ${PORT}!`);
}
