const prisma = require('../config/db');

const getAuditLogs = async (req, res, next) => {
  try {
    const { limit = 50, offset = 0 } = req.query;
    
    const logs = await prisma.auditLog.findMany({
      take: parseInt(limit, 10),
      skip: parseInt(offset, 10),
      orderBy: { createdAt: 'desc' },
      include: {
        admin: {
          select: { usuario: true }
        }
      }
    });

    const total = await prisma.auditLog.count();

    res.json({ logs, total });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAuditLogs };
