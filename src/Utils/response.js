const response = (res, statusCode, message, data = null) => {
  res.status(statusCode).json({
    success: statusCode >= 200 && statusCode < 300,
    statusCode,
    message,
    data,
  });
};

const createResponse = (statusCode) => (res, message, data) => response(res, statusCode, message, data);

const statusCodes = {
  ok: 200,
  created: 201,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  conflict: 409,
  internalServerError: 500,
  serverError:500,
  serviceUnavailable: 503,
};

const responses = Object.fromEntries(
  Object.entries(statusCodes).map(([key, code]) => [key, createResponse(code)])
);

export default responses;
