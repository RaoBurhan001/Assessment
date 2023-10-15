const golbalResponse = (
    res, data = {}, status = 'success', message = '', statusCode = 200
  ) => {
    res.status(statusCode).send({
      statusCode,
      status,
      data,
      message
    })
  }
  
  module.exports = golbalResponse
  