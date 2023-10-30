const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    // Comprueba que el encabezado de autorización esté presente en la solicitud.
    if (!req.headers.authorization) {
      throw new Error('Authentication failed!1');
    }

    // Obtiene el token de acceso del encabezado de autorización.
    const token = req.headers.authorization.split(' ')[1];

    // Verifica el token de acceso.
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);

    // Almacena el ID de usuario del token en la solicitud.
    req.userData = { userId: decodedToken.userId };

    // Continúa con la siguiente solicitud.
    next();
  } catch (err) {
    // Maneja el error.
    const error = new HttpError('Authentication failed!', 403);
    return next(error);
  }
};
