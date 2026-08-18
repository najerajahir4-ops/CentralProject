const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const prisma = require('../config/db');
const { authLoginSchema } = require('../utils/validators');

const login = async (req, res, next) => {
  try {
    // Validación estricta de seguridad con Zod (rechaza campos adicionales y excesivamente largos)
    const { usuario, password } = authLoginSchema.parse(req.body);

    const admin = await prisma.adminUser.findUnique({ where: { usuario: usuario.toLowerCase() } });
    if (!admin) {
      return res.status(401).json({ error: 'Credenciales inválidas.' });
    }

    const isValidPassword = await bcrypt.compare(password, admin.passwordHash);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Credenciales inválidas.' });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    const token = jwt.sign(
      { id: admin.id, usuario: admin.usuario, nombreVisible: admin.nombreVisible, rol: admin.rol },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    const isProd = process.env.NODE_ENV === 'production';

    // Guardar token en cookie httpOnly
    res.cookie('token', token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Generar y guardar token CSRF (No httpOnly, para que Axios lo pueda leer)
    const csrfToken = crypto.randomBytes(32).toString('hex');
    res.cookie('csrfToken', csrfToken, {
      httpOnly: false,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    const { logAction } = require('../utils/auditLogger');
    await logAction(admin.id, 'LOGIN', 'AUTH', null, `Sesión iniciada por ${admin.usuario}`);

    return res.json({
      message: 'Inicio de sesión exitoso',
      user: { id: admin.id, usuario: admin.usuario, nombreVisible: admin.nombreVisible, rol: admin.rol },
    });
  } catch (error) {
    next(error);
  }
};

const verifyToken = async (req, res) => {
  return res.json({ user: req.user });
};

const logout = (req, res) => {
  res.clearCookie('token');
  res.clearCookie('csrfToken');
  return res.json({ message: 'Sesión cerrada correctamente.' });
};

const updateProfile = async (req, res, next) => {
  try {
    const { nuevoUsuario } = req.body;
    const adminId = req.user.id;

    if (!nuevoUsuario || nuevoUsuario.trim() === '') {
      return res.status(400).json({ error: 'El nombre de usuario no puede estar vacío.' });
    }

    const updated = await prisma.adminUser.update({
      where: { id: adminId },
      data: { nombreVisible: nuevoUsuario }
    });

    // Registrar en auditoría
    const { logAction } = require('../utils/auditLogger');
    await logAction(adminId, 'EDITAR', 'ADMIN', adminId, `Actualizó su nombre visible a: ${nuevoUsuario}`);

    // Regenerar token con el nuevo nombre
    const token = jwt.sign(
      { id: updated.id, usuario: updated.usuario, nombreVisible: updated.nombreVisible, rol: updated.rol },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    const isProd = process.env.NODE_ENV === 'production';
    res.cookie('token', token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Renovar también el CSRF token
    const csrfToken = crypto.randomBytes(32).toString('hex');
    res.cookie('csrfToken', csrfToken, {
      httpOnly: false,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.json({
      message: 'Perfil actualizado correctamente.',
      user: { id: updated.id, usuario: updated.usuario, nombreVisible: updated.nombreVisible, rol: updated.rol },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  verifyToken,
  logout,
  updateProfile,
};
