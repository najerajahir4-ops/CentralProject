const { logAction } = require('./src/utils/auditLogger');
const prisma = require('./src/config/db');

async function test() {
  await logAction(null, 'LOGIN', 'AUTH', null, 'Prueba de auditoría funcionando');
  console.log('Log insertado. Consultando...');
  const logs = await prisma.auditLog.findMany();
  console.log(logs);
}
test();
