const express = require('express');
const router = express.Router();
const multer = require('multer');
const rateLimit = require('express-rate-limit');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');
const authMiddleware = require('../middleware/authMiddleware');

// Rate limiting específico para subida de archivos (máx 10 subidas por IP cada 15 min)
const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Límite de subidas alcanzado. Por favor, intente de nuevo en 15 minutos.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'paginabryan_students',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp']
  },
});

const allowedMimes = ['image/jpeg', 'image/png', 'image/webp'];

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Máximo 5 MB
    files: 1,
  },
  fileFilter: (req, file, cb) => {
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Tipo de archivo no permitido. Solo se permiten imágenes JPG, PNG o WEBP.'));
    }
  }
});

router.post('/', authMiddleware, uploadLimiter, (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'El archivo excede el tamaño máximo permitido de 5 MB.' });
      }
      return res.status(400).json({ error: err.message || 'Error al procesar el archivo subido.' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No se subió ningún archivo.' });
    }

    return res.json({ url: req.file.path });
  });
});

module.exports = router;
