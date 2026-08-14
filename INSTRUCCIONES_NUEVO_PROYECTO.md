# Guía de Inicio: Nueva Página Web (Clon de Najera's Team)

¡Hola! Soy Antigravity, tu asistente de IA. He sido inicializado en este nuevo proyecto a partir de la copia base de "Pagina Bryan".

Si estás leyendo esto en una **nueva conversación**, ¡perfecto! A continuación tienes la ruta exacta de lo que vamos a hacer paso a paso para levantar este nuevo sitio sin afectar al original.

---

## 1. Limpieza e Instalación Inicial (Primer Paso)

Lo primero que haremos juntos será instalar las dependencias (ya que evitamos copiar los pesados `node_modules`). Para ello correremos en la terminal de la nueva carpeta:

```bash
cd client
npm install
cd ../server
npm install
```

## 2. Configuración de Base de Datos y Variables de Entorno

**⚠️ MUY IMPORTANTE:** Nunca debemos usar la misma base de datos del proyecto anterior.

1.  Crea una nueva base de datos PostgreSQL (ej. en Supabase o Neon).
2.  Crea un nuevo proyecto en **Cloudinary** para almacenar las fotos (o reutiliza uno si es el mismo dueño, pero recomiendo separarlo para no mezclar fotos de perfiles).
3.  Crea el archivo `.env` dentro de la carpeta `server/` con las siguientes variables:

```env
# URL de la NUEVA base de datos
DATABASE_URL="postgres://tu_usuario:tu_password@host/nombre_bd"

# JWT Secret para sesiones (puedes inventar uno nuevo o generar uno alfanumérico largo)
JWT_SECRET="tu_super_secreto_nuevo_12345"

# Credenciales de Cloudinary (Nuevas)
CLOUDINARY_CLOUD_NAME="tu_cloud_name"
CLOUDINARY_API_KEY="tu_api_key"
CLOUDINARY_API_SECRET="tu_api_secret"
```

## 3. Preparación de la Base de Datos

Una vez configuradas las variables, sincronizaremos las tablas de Prisma:

```bash
cd server
npx prisma db push
```

*(Opcional: Si necesitas datos iniciales como el usuario administrador, puedes correr `node prisma/seed.js` adaptando antes las credenciales por defecto que vengan ahí).*

## 4. Personalización del Cliente (Frontend)

Aquí iremos reemplazando "Najera's Team" por la nueva academia:

1.  **Imágenes:** Reemplazar `/client/public/logo.png`, el favicon y las fotos genéricas predeterminadas.
2.  **Textos:** Cambiar el título en `client/index.html` (línea `<title>`).
3.  **Colores Corporativos:** Iremos a `client/tailwind.config.js` e `client/src/index.css` para ajustar los colores (como `dorado-campeon`, `rojo-impacto`, etc.) por la nueva paleta.
4.  **Textos estáticos:** Haremos una búsqueda global en el frontend de palabras como "Najera", "Bryan", "Taekwondo", etc. para cambiar el copy a la medida.

## 5. Pruebas Locales

Correremos ambos servidores para asegurar que todo cargue impecable:

```bash
# Terminal 1
cd server
npm run dev

# Terminal 2
cd client
npm run dev
```

## 6. Despliegue en Producción

1.  Crearemos un **nuevo repositorio** en GitHub para este código y lo subiremos con `git init`, `git add .`, `git commit`, `git push`.
2.  Iremos a **Vercel** o tu servicio de hosting, crearemos un nuevo proyecto enlazado a ese repositorio.
3.  Configuraremos en Vercel las mismas **Variables de Entorno** del paso 2.

---

### ¿Cómo empezamos?
Solo dime: *"Antigravity, ya creé la nueva base de datos"* o *"Antigravity, vamos a empezar a instalar dependencias"* y nos ponemos manos a la obra.
