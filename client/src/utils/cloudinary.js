/**
 * Utilidades para optimización dinámica y entrega de imágenes con Cloudinary.
 * Aplica compresión inteligente (q_auto), formato moderno (f_auto),
 * redimensión y centrado automático en el rostro (g_face / c_fill)
 * sin modificar ni duplicar el archivo original en la nube.
 */

export const CLOUDINARY_PRESETS = {
  // Tarjetas de estudiantes en perfiles, galerías y cuadros de honor (imagen completa sin recortes)
  CARD: {
    width: 600,
    crop: 'limit',
    quality: 'auto',
    format: 'auto',
  },
  // Avatares circulares de perfil
  AVATAR: {
    width: 300,
    height: 300,
    crop: 'fill',
    gravity: 'face',
    quality: 'auto',
    format: 'auto',
  },
  // Miniaturas en tablas y listados administrativos
  THUMBNAIL: {
    width: 120,
    height: 120,
    crop: 'fill',
    gravity: 'face',
    quality: 'auto',
    format: 'auto',
  },
  // Miniaturas de la galería de progreso y fotos del dojang (imagen completa)
  GALLERY_THUMB: {
    width: 600,
    crop: 'limit',
    quality: 'auto',
    format: 'auto',
  },
  // Vista expandida en modal a pantalla completa (alta calidad sin peso excesivo)
  MODAL: {
    width: 1400,
    crop: 'limit',
    quality: 'auto',
    format: 'auto',
  },
  // Vista completa en modales o galerías
  FULL: {
    width: 1200,
    crop: 'limit',
    quality: 'auto',
    format: 'auto',
  },
};

/**
 * Transforma una URL de Cloudinary agregando parámetros de optimización y encuadre.
 * Si la URL no es de Cloudinary o es inválida, se devuelve intacta como fallback seguro.
 *
 * @param {string} url - URL de la imagen
 * @param {object} options - Opciones de transformación (width, height, crop, gravity, etc.)
 * @returns {string} URL optimizada de entrega rápida
 */
export const optimizeCloudinary = (url, options = {}) => {
  if (!url || typeof url !== 'string') return url || '';

  // Solo aplicar a imágenes alojadas en Cloudinary que tengan el segmento /image/upload/
  if (!url.includes('cloudinary.com') || !url.includes('/image/upload/')) {
    return url;
  }

  const {
    width,
    height,
    crop,
    gravity,
    quality = 'auto',
    format = 'auto',
  } = options;

  const parts = url.split('/image/upload/');
  if (parts.length !== 2) return url;

  const prefix = parts[0] + '/image/upload/';
  let rest = parts[1];

  // Si la URL ya posee transformaciones previas, limpiarlas para no duplicarlas
  const transformMatch = rest.match(/^([a-z0-9_,-]+)\/(v\d+\/.*|[a-zA-Z0-9_].*)$/);
  if (transformMatch && transformMatch[1].includes('_')) {
    rest = transformMatch[2];
  }

  const transforms = [];
  if (format) transforms.push(`f_${format}`);
  if (quality) transforms.push(`q_${quality}`);
  if (width) transforms.push(`w_${width}`);
  if (height) transforms.push(`h_${height}`);
  if (crop) transforms.push(`c_${crop}`);
  // Cloudinary solo admite gravity en recortes (fill, crop, thumb). En c_limit arroja error 400 si se envía gravity.
  if (gravity && (!crop || ['fill', 'crop', 'thumb'].includes(crop))) {
    transforms.push(`g_${gravity}`);
  }

  return `${prefix}${transforms.join(',')}/${rest}`;
};

export default optimizeCloudinary;

