const path = require("path");

// Load environment variables from a .env file located one directory above this file.
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const express = require("express");
const cors = require("cors");

const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");
const reservationsRouter = require("./reservations/reservations.router");
const tablesRouter = require("./tables/tables.router");

const app = express();

// Enable Cross-Origin Resource Sharing (CORS).
app.use(cors());

// Parse JSON requests.
app.use(express.json());

// Use routers for reservations and tables.
app.use("/reservations", reservationsRouter);
app.use("/tables", tablesRouter);

// Handle 404 Not Found errors.
app.use(notFound);

// Handle other errors with the errorHandler middleware.
app.use(errorHandler);

module.exports = app;
