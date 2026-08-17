import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const dummyBlocks = [
    {
      id: "1",
      type: "TEXT",
      content: "<p><strong>¡Bienvenidos a la nueva plataforma de contenido del Club Central!</strong></p><p>Este es un artículo de prueba generado automáticamente para que puedas ver cómo luce el nuevo diseño del <em>Page Builder</em> en la vista pública de la <strong>Biblioteca Marcial</strong>.</p>"
    },
    {
      id: "2",
      type: "TWO_COLUMNS",
      leftCol: "<p>En esta columna izquierda, puedes colocar información sobre técnicas de pateo, historia del taekwondo o estrategias de combate.</p>",
      rightCol: "<p>En esta columna derecha, puedes complementar con reglamentos actualizados, detalles técnicos o simplemente separar la información para hacerla más digerible.</p>"
    },
    {
      id: "3",
      type: "EVENT_INFO",
      lugar: "Coliseo Tsáchila",
      fecha: "Sábado 24 de Agosto",
      requisito: "Dobok Blanco Oficial",
      costo: "$15.00",
      description: "Recuerda llegar 30 minutos antes para el pesaje oficial y calentamiento."
    }
  ];

  await prisma.content.create({
    data: {
      titulo: 'Simulación: Así lucen tus nuevos artículos',
      resumen: 'Este es un artículo de prueba para visualizar el diseño en la Biblioteca Marcial. Haz clic para leer más.',
      cuerpo: JSON.stringify(dummyBlocks),
      categoria: 'TECNICA',
      fechaPublicacion: new Date().toISOString().split('T')[0],
      imagenUrl: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=1000&auto=format&fit=crop', // Imagen dummy de Taekwondo/Marcial
    }
  });

  console.log("Artículo de prueba creado exitosamente.");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
