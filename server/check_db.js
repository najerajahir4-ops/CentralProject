const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const contents = await prisma.content.findMany();
  console.log('--- CONTENTS ---');
  console.log(contents);

  const logs = await prisma.auditLog.findMany({
    where: { entidad: 'CONTENIDO' },
    orderBy: { createdAt: 'desc' },
    take: 5
  });
  console.log('\n--- LATEST AUDIT LOGS FOR CONTENT ---');
  console.log(logs);
}

main().catch(console.error).finally(() => prisma.$disconnect());
