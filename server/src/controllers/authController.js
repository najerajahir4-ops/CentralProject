const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
      { id: admin.id, usuario: admin.usuario, rol: admin.rol },
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

    const { logAction } = require('../utils/auditLogger');
    await logAction(admin.id, 'LOGIN', 'AUTH', null, `Sesión iniciada por ${admin.usuario}`);

    return res.json({
      message: 'Inicio de sesión exitoso',
      user: { id: admin.id, usuario: admin.usuario, rol: admin.rol },
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
  return res.json({ message: 'Sesión cerrada correctamente.' });
};

module.exports = {
  login,
  verifyToken,
  logout,
};
