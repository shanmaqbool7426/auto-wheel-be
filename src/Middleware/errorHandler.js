import responses from "../Utils/response.js";

function errorHandler(err, req, res, next) {
    console.log(err);
    responses.internalServerError(res, 'Internal Server Error',err);
  }
  
 export { errorHandler};
  