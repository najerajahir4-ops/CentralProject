const { ZodError } = require('zod');

const errorHandler = (err, req, res, next) => {
  // Siempre loguear detalle completo en el servidor para depuración
  console.error('🔥 Error en el servidor:', err.stack || err);

  if (err instanceof ZodError) {
    const errorMessages = err.errors.map(e => e.message).join(', ');
    return res.status(400).json({ error: `Error de validación: ${errorMessages}` });
  }

  const isProd = process.env.NODE_ENV === 'production';
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  // En producción no exponer mensajes internos para errores 500
  const message = isProd && statusCode === 500
    ? 'Error interno del servidor. Por favor, intente más tarde.'
    : err.message || 'Error interno del servidor';

  return res.status(statusCode).json({
    error: message,
  });
};

module.exports = errorHandler;
