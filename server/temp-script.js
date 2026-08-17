const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.adminUser.update({
    where: { id: 6 },
    data: { usuario: 'diego', nombreVisible: 'Diego ssa' }
  });
  console.log("Usuario 6 actualizado a diego");
}

main().finally(() => prisma.$disconnect());
