require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const password = process.env.ADMIN_SEED_PASSWORD || process.env.ADMIN_PASSWORD;
  const username = (process.env.ADMIN_USER || 'admin').toLowerCase().trim();

  if (!password) {
    console.error('❌ Error: Debe definir la variable de entorno ADMIN_SEED_PASSWORD o ADMIN_PASSWORD.');
    process.exit(1);
  }

  console.log('🔄 Actualizando credenciales del Administrador desde variables de entorno...');
  const hash = await bcrypt.hash(password, 10);
  
  // Buscar usuario admin existente
  const admin = await prisma.adminUser.findFirst({
    where: { usuario: username }
  });

  if (admin) {
    await prisma.adminUser.update({
      where: { id: admin.id },
      data: {
        passwordHash: hash,
        rol: 'ADMIN'
      }
    });
    console.log(`✅ Contraseña del Administrador '${username}' actualizada con éxito!`);
  } else {
    await prisma.adminUser.create({
      data: {
        usuario: username,
        passwordHash: hash,
        rol: 'ADMIN'
      }
    });
    console.log(`✅ Administrador '${username}' creado con éxito!`);
  }
}

main()
  .catch(e => {
    console.error('❌ Error al actualizar admin:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
