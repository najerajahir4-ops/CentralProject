const prisma = require('../config/db');
const { logAction } = require('../utils/auditLogger');

const getAllContent = async (req, res, next) => {
  try {
    const { categoria, search } = req.query;

    const where = {};
    if (categoria) where.categoria = categoria;
    if (search) {
      where.OR = [
        { titulo: { contains: search } },
        { resumen: { contains: search } },
      ];
    }

    const contents = await prisma.content.findMany({
      where,
      orderBy: { orden: 'asc' },
    });
    return res.json(contents);
  } catch (error) {
    next(error);
  }
};

const getContentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const content = await prisma.content.findUnique({
      where: { id: parseInt(id) },
    });
    if (!content) {
      return res.status(404).json({ error: 'Publicación no encontrada.' });
    }
    return res.json(content);
  } catch (error) {
    next(error);
  }
};

const createContent = async (req, res, next) => {
  try {
    const { titulo, categoria, resumen, cuerpo, imagenUrl, videoUrl, fechaPublicacion } = req.body;

    if (!titulo || !categoria || !resumen || !cuerpo) {
      return res.status(400).json({ error: 'Título, categoría, resumen y cuerpo son campos requeridos.' });
    }

    // Buscar el máximo orden existente para posicionar al final
    const maxItem = await prisma.content.findFirst({
      orderBy: { orden: 'desc' },
      select: { orden: true }
    });
    const nextOrder = (maxItem?.orden || 0) + 1;

    const newContent = await prisma.content.create({
      data: {
        titulo,
        categoria,
        resumen,
        cuerpo,
        imagenUrl: imagenUrl || 'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=800&q=80',
        videoUrl: videoUrl || '',
        fechaPublicacion: fechaPublicacion || new Date().toISOString().split('T')[0],
        orden: nextOrder,
      },
    });

    const adminId = req.user ? req.user.id : null;
    await logAction(adminId, 'CREAR', 'CONTENIDO', newContent.id, `Publicación creada: ${titulo}`);

    return res.status(201).json(newContent);
  } catch (error) {
    next(error);
  }
};

const updateContent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { titulo, categoria, resumen, cuerpo, imagenUrl, videoUrl, fechaPublicacion } = req.body;

    const updated = await prisma.content.update({
      where: { id: parseInt(id) },
      data: {
        titulo,
        categoria,
        resumen,
        cuerpo,
        imagenUrl,
        videoUrl,
        fechaPublicacion,
      },
    });

    const adminId = req.user ? req.user.id : null;
    await logAction(adminId, 'EDITAR', 'CONTENIDO', updated.id, `Publicación actualizada: ${titulo}`);

    return res.json(updated);
  } catch (error) {
    next(error);
  }
};

const deleteContent = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.content.delete({ where: { id: parseInt(id) } });
    const adminId = req.user ? req.user.id : null;
    await logAction(adminId, 'ELIMINAR', 'CONTENIDO', parseInt(id), `Publicación eliminada ID: ${id}`);

    return res.json({ message: 'Publicación eliminada con éxito.' });
  } catch (error) {
    next(error);
  }
};

const reorderContents = async (req, res, next) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids)) {
      return res.status(400).json({ error: 'Se requiere un array de IDs para reordenar.' });
    }

    await prisma.$transaction(
      ids.map((id, index) =>
        prisma.content.update({
          where: { id: parseInt(id) },
          data: { orden: index + 1 }
        })
      )
    );

    const adminId = req.user ? req.user.id : null;
    await logAction(adminId, 'EDITAR', 'CONTENIDO', null, `Orden de publicaciones actualizado`);

    return res.json({ message: 'Orden de publicaciones actualizado con éxito.' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContent,
  getContentById,
  createContent,
  updateContent,
  deleteContent,
  reorderContents,
};
