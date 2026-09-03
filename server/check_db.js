const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const contents = await prisma.content.findMany();
  console.log('✅ Contenidos en base de datos:', contents.length);
}

main().catch(console.error).finally(() => prisma.$disconnect());
