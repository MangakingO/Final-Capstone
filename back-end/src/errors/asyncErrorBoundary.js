// This function is designed to create an async error handler middleware
// that simplifies error handling in async routes. It uses async/await along
// with a try/catch block to catch and handle errors gracefully.

function asyncErrorBoundary(delegate, defaultStatus) {
    return async (req, res, next) => {
      try {
        // Await the execution of the provided delegate function, which represents
        // the core functionality of an asynchronous route.
        await delegate(req, res, next);
      } catch (error) {
        // If an error is caught during execution, we destructure the error object
        // to extract the status and message properties if they exist. If not,
        // defaultStatus is used for status, and the error message itself is used.
        const { status = defaultStatus, message = error } = error;
        
        // Forward the error to the global error handler middleware by passing it
        // to the next() function. This will ensure consistent error responses.
        next({ status, message });
      }
    };
  }
  
  // Export the asyncErrorBoundary function so that it can be used as middleware
  // in Express routes to handle errors efficiently.
  module.exports = asyncErrorBoundary;
  