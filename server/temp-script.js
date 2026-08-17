const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const logs = await prisma.auditLog.findMany({ take: 20, orderBy: { id: 'desc' } });
  console.log(logs);
}

main().finally(() => prisma.$disconnect());
