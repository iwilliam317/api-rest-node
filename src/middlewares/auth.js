module.exports = (request, response, next) => {
  const authHeader = request.headers.authorization;

  if (!authHeader)
    return response.status(401).send({ error: 'No token provided! '});

  const parts = authHeader.split(' ');

  if (parts.length ===2 )
    return response.status(401).send({ error: 'Token error! '});

};