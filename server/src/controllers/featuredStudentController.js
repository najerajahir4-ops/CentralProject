const prisma = require('../config/db');
const { logAction } = require('../utils/auditLogger');

const getFeaturedStudents = async (req, res, next) => {
  try {
    const { categoria, disciplina } = req.query;

    const where = {};
    if (categoria) where.categoria = categoria;
    if (disciplina) where.disciplina = disciplina;

    const list = await prisma.featuredStudent.findMany({
      where,
      select: {
        id: true,
        studentId: true,
        logros: true,
        categoria: true,
        disciplina: true,
        orden: true,
        imagenUrl: true,
        student: {
          select: {
            id: true,
            nombres: true,
            apellidos: true,
            grado: true,
            foto: true,
            club: {
              select: {
                id: true,
                nombre: true,
              },
            },
          },
        },
      },
      orderBy: { orden: 'asc' },
    });

    return res.json(list);
  } catch (error) {
    next(error);
  }
};

const createFeaturedStudent = async (req, res, next) => {
  try {
    const { studentId, logros, categoria, disciplina, imagenUrl } = req.body;

    if (!studentId || !logros || !categoria || !disciplina) {
      return res.status(400).json({ error: 'Faltan campos para registrar alumno destacado.' });
    }

    // Buscar el máximo orden existente para posicionar al final
    const maxItem = await prisma.featuredStudent.findFirst({
      orderBy: { orden: 'desc' },
      select: { orden: true }
    });
    const nextOrder = (maxItem?.orden || 0) + 1;

    const created = await prisma.featuredStudent.create({
      data: {
        studentId: parseInt(studentId),
        logros,
        categoria,
        disciplina,
        orden: nextOrder,
        imagenUrl: imagenUrl || null,
      },
      select: {
        id: true,
        studentId: true,
        logros: true,
        categoria: true,
        disciplina: true,
        orden: true,
        imagenUrl: true,
        student: {
          select: {
            id: true,
            nombres: true,
            apellidos: true,
            grado: true,
            foto: true,
            club: {
              select: {
                id: true,
                nombre: true,
              },
            },
          },
        },
      },
    });

    const adminId = req.user ? req.user.id : null;
    await logAction(adminId, 'CREAR', 'CONTENIDO', created.id, `Alumno destacado agregado: ID ${studentId}`);

    return res.status(201).json(created);
  } catch (error) {
    next(error);
  }
};

const updateFeaturedStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { logros, categoria, disciplina, imagenUrl } = req.body;

    const updated = await prisma.featuredStudent.update({
      where: { id: parseInt(id) },
      data: { logros, categoria, disciplina, imagenUrl: imagenUrl || null },
      select: {
        id: true,
        studentId: true,
        logros: true,
        categoria: true,
        disciplina: true,
        orden: true,
        imagenUrl: true,
        student: {
          select: {
            id: true,
            nombres: true,
            apellidos: true,
            grado: true,
            foto: true,
            club: {
              select: {
                id: true,
                nombre: true,
              },
            },
          },
        },
      },
    });

    const adminId = req.user ? req.user.id : null;
    await logAction(adminId, 'EDITAR', 'CONTENIDO', updated.id, `Alumno destacado actualizado`);

    return res.json(updated);
  } catch (error) {
    next(error);
  }
};

const deleteFeaturedStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.featuredStudent.delete({ where: { id: parseInt(id) } });
    const adminId = req.user ? req.user.id : null;
    await logAction(adminId, 'ELIMINAR', 'CONTENIDO', parseInt(id), `Alumno destacado eliminado ID: ${id}`);

    return res.json({ message: 'Alumno destacado eliminado.' });
  } catch (error) {
    next(error);
  }
};

const reorderFeaturedStudents = async (req, res, next) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids)) {
      return res.status(400).json({ error: 'Se requiere un array de IDs para reordenar.' });
    }

    await prisma.$transaction(
      ids.map((id, index) =>
        prisma.featuredStudent.update({
          where: { id: parseInt(id) },
          data: { orden: index + 1 }
        })
      )
    );

    const adminId = req.user ? req.user.id : null;
    await logAction(adminId, 'EDITAR', 'CONTENIDO', null, `Orden de alumnos destacados actualizado`);

    return res.json({ message: 'Orden de alumnos destacados actualizado con éxito.' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getFeaturedStudents,
  createFeaturedStudent,
  updateFeaturedStudent,
  deleteFeaturedStudent,
  reorderFeaturedStudents,
};
