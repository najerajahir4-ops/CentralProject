const { logAction } = require('./src/utils/auditLogger');
const prisma = require('./src/config/db');

async function test() {
  await logAction(null, 'CREAR', 'ALUMNO', 999, 'Test');
  const logs = await prisma.auditLog.findMany();
  console.log(logs);
}
test();
