const express = require('express');
const router = express.Router();
const {
  getStudents,
  getPublicStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getDashboardStats,
  addGalleryPhoto,
  deleteGalleryPhoto,
  getAllGalleryPhotos,
} = require('../controllers/studentController');
const authMiddleware = require('../middleware/authMiddleware');

// Ruta pública para listar estudiantes en la vista pública (Salón de Campeones)
router.get('/public', getPublicStudents);

// Rutas protegidas para administración de estudiantes
router.get('/stats', authMiddleware, getDashboardStats);
router.get('/', authMiddleware, getStudents);
router.get('/:id', authMiddleware, getStudentById);
router.post('/', authMiddleware, createStudent);
router.put('/:id', authMiddleware, updateStudent);
router.delete('/:id', authMiddleware, deleteStudent);

// Rutas para galería del perfil (Pública para visualización de fotos aprobadas)
router.get('/gallery/all', getAllGalleryPhotos);

// Rutas para galería del perfil (Protegidas)
router.post('/:id/gallery', authMiddleware, addGalleryPhoto);
router.delete('/gallery/:photoId', authMiddleware, deleteGalleryPhoto);

module.exports = router;
