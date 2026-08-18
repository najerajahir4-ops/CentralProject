/**
 * Extrae un mensaje de error legible a partir de cualquier objeto de error arrojado por Axios, Vercel o el Backend.
 * @param {Error} error Objeto de error capturado en un bloque catch.
 * @param {string} fallbackMessage Mensaje de respaldo si no se logra extraer nada.
 * @returns {string} Un mensaje de error formateado y legible.
 */
export const getErrorMessage = (error, fallbackMessage = 'Ocurrió un error inesperado.') => {
  if (error?.response?.data) {
    const data = error.response.data;

    // Si el backend Express retorna { error: "mensaje literal" }
    if (typeof data.error === 'string') {
      return data.error;
    }

    // Si Vercel Serverless Function intercepta (ej: 413 Payload Too Large) y devuelve un objeto de error
    if (data.error && typeof data.error === 'object') {
      if (data.error.message) {
        return data.error.message;
      }
      return JSON.stringify(data.error);
    }

    // Si devuelve un message
    if (typeof data.message === 'string') {
      return data.message;
    }
    
    // Fallback genérico para otros tipos de respuesta JSON estructurada
    return JSON.stringify(data);
  }

  // Si no hay response (error de red o timeout)
  if (error?.message) {
    return error.message;
  }

  return fallbackMessage;
};
