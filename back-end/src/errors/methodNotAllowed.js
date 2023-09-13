// This function is a middleware designed to handle HTTP requests with methods
// that are not allowed for a specific route. It is typically used as a fallback
// in routes where certain HTTP methods are not supported.

function methodNotAllowed(req, res, next) {
    // Create an error object with a 405 status code (Method Not Allowed) and a
    // message that indicates which HTTP method is not allowed for the current URL.
    next({
      status: 405,
      message: `${req.method} not allowed for ${req.originalUrl}`,
    });
  }
  
  // Export the methodNotAllowed function so that it can be used as middleware
  // in Express routes to respond with a 405 status code when necessary.
  module.exports = methodNotAllowed;
  