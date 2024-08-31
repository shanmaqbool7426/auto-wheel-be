import responses from "../Utils/response.js";

function errorHandler(err, req, res, next) {
    console.error(err.stack);
    responses.internalServerError(res, 'Internal Server Error');
  }
  
 export { errorHandler};
  