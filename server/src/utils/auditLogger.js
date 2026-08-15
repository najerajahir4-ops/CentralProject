const prisma = require('../config/db');

/**
 * Registra una acción en el historial de auditoría
 * @param {Number|null} adminId - ID del administrador (puede ser null si es una acción genérica o error de login)
 * @param {String} accion - Ej: 'CREAR', 'EDITAR', 'ELIMINAR', 'LOGIN'
 * @param {String} entidad - Ej: 'ALUMNO', 'PAGO', 'ASISTENCIA', 'AUTH'
 * @param {Number|null} entidadId - ID de la entidad afectada
 * @param {String|null} detalles - Descripción adicional
 */
const logAction = async (adminId, accion, entidad, entidadId = null, detalles = null) => {
  try {
    await prisma.auditLog.create({
      data: {
        adminId: adminId ? parseInt(adminId, 10) : null,
        accion,
        entidad,
        entidadId: entidadId ? parseInt(entidadId, 10) : null,
        detalles,
      },
    });
  } catch (error) {
    console.error('Error registrando auditoría:', error);
  }
};

module.exports = { logAction };
