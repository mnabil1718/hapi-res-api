function generateResponse({ h, statusCode = 200, status = 'success', message = undefined, data = undefined }) {
  return h.response({
    status,
    ...(message !== undefined && { message }),
    ...(data !== undefined && { data })
  }).code(statusCode);
};


const serverErrorResponse = ({ h, message = 'server-side error' }) => {
  return generateResponse({ h, statusCode: 500, status: 'fail', message });
};

const notFoundErrorResponse = ({ h, message = 'not found' }) => {
  return generateResponse({ h, statusCode: 404, status: 'fail', message });
};


module.exports = { generateResponse, serverErrorResponse, notFoundErrorResponse };