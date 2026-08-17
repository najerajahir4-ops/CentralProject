# Academia de Taekwondo & Kickboxing - Sistema de Gestión y Web Oficial

Plataforma Web Full-Stack integral construida desde cero. Consta de una **Landing Page interactiva pública** para atraer nuevos clientes y un **Sistema de Gestión (CRM/ERP) privado** diseñado a medida para optimizar el control de estudiantes, pagos, asistencia, eventos y blog de contenido.

---

## 🏗️ Arquitectura y Tecnologías (Stack MERN/Prisma)

El proyecto utiliza una arquitectura desacoplada moderna:

### **Frontend (Cliente Web) - `/client`**
* **Librería Core:** React 18
* **Herramienta de Construcción:** Vite (Ultra rápido, con Hot Module Replacement)
* **Estilizado (UI/UX):** TailwindCSS (Diseño Utility-First, Modo Oscuro nativo, animaciones customizadas).
* **Enrutamiento:** React Router DOM v6 (Protección de rutas privadas, navegación SPA).
* **Gráficos e Iconos:** Recharts (para los gráficos del Dashboard) y Lucide-React.
* **Procesamiento de Texto:** `react-markdown` y `rehype-sanitize` para renderizado seguro de artículos del blog en pantalla dividida.

### **Backend (Servidor API) - `/server`**
* **Motor:** Node.js con Express.js
* **Base de Datos ORM:** Prisma (Tipado estricto, migraciones automáticas).
* **Autenticación:** JSON Web Tokens (JWT) encriptados y almacenados en Cookies `httpOnly` de máxima seguridad.
* **Almacenamiento Cloud:** Integración con **Cloudinary** vía `multer` para guardar fotos de alumnos y portadas de blogs en la nube sin saturar el servidor.

---

## 🗄️ Estructura de la Base de Datos (Prisma ORM)

La base de datos (PostgreSQL/SQLite) no es plana, sino un **modelo relacional estrictamente estandarizado** que garantiza la integridad referencial (no deja datos huérfanos) mediante eliminaciones en cascada (`onDelete: Cascade`).

### **Modelos Principales:**
1. **`AdminUser` & `AuditLog`**:
   * Los administradores poseen su usuario y contraseña encriptada (con Bcrypt). Tienen control sobre su "Nombre Visible".
   * El `AuditLog` rastrea cada acción sensible (crear, editar, eliminar) vinculándola al Administrador específico. Si hay un cambio extraño, se sabe quién lo hizo.
2. **`Student` (Estudiante Central)**:
   * Almacena datos personales, médicos (tipos de sangre, alergias), información de contacto de emergencia, cédulas únicas (`@unique`) y grados en artes marciales (Cinturones de TKD o Kickboxing).
   * **Relaciones 1 a Muchos**: Un `Student` tiene muchos `Payment` (Pagos), muchos `Attendance` (Asistencias) y múltiples `StudentGallery` (Fotos de progreso).
3. **`Payment` (Gestión Financiera Automática)**:
   * Calcula automáticamente el estado financiero de cada alumno. Determina visualmente mediante un sistema semáforo (Verde, Amarillo, Rojo) el nivel de deuda del estudiante basándose en su última fecha de pago y su periodicidad (Mensual, Trimestral o Anual).
4. **`Content` (Motor de Blog/Noticias)**:
   * Un CMS (Sistema de Gestión de Contenidos) interno que almacena el formato Markdown, títulos, etiquetas, resúmenes e imágenes de portada en Cloudinary para alimentar la pantalla de novedades.
5. **`GeneralPhoto` (Legalidad de Imágenes)**:
   * Galería pública con un campo estricto `tieneAutorizacionLegal`. No se publica ninguna foto sin la confirmación legal del representante (Especialmente importante para menores de edad).

---

## 🛡️ Seguridad y Hardening Nivel Empresarial

El sistema ha pasado por múltiples capas de fortificación técnica para proteger los datos financieros y personales:

* **Inyección de Código (XSS) Prevenida:** El editor de artículos (Markdown) bloquea agresivamente cualquier script malicioso a través de `rehype-sanitize`. Es imposible que un atacante inyecte un `<script>` oculto que afecte a los visitantes públicos.
* **Autenticación Inquebrantable (JWT & Cookies):** A diferencia de aplicaciones amateurs que guardan los tokens de sesión a plena vista (`localStorage`), tu sistema inyecta el Token directamente en el flujo HTTP (`httpOnly` cookies). Esto hace que sea técnicamente invisible e inaccesible para ataques de robo de sesión por inyección de JavaScript.
* **Protección Anti Fuerza Bruta (Rate Limiting):** El servidor Express está blindado contra ataques masivos. Las rutas generales están limitadas a 200 peticiones por IP, pero **la ruta de Login es estricta:** permite un máximo de 5 intentos fallidos antes de bloquear temporalmente la IP del atacante.
* **Cabeceras HTTP Seguras (Helmet):** Se inyectan políticas de seguridad avanzadas en el flujo del servidor (`helmet()`), permitiendo conexiones a orígenes de confianza de manera estructurada (Cross-Origin Resource Policy) para proteger contra ataques de Clickjacking.

---

## 🚀 Configuración Local y Despliegue (Vercel)

### Levantar el Proyecto Localmente:
1. Asegúrate de tener Node.js instalado.
2. Abre una terminal en `/server` y corre `npm install`. Luego genera la base de datos con `npx prisma db push` y arranca con `npm run dev`.
3. Abre otra terminal en `/client`, corre `npm install` y arranca el frontend con `npm run dev`.

### Despliegue Continuo (CI/CD) en Vercel:
Este repositorio está diseñado como un **Monorepo** y conectado a Vercel. 
Cada cambio que guardas dispara un *Build* automático en la nube. 
Para actualizar la página en producción, simplemente ejecuta:
```bash
git add .
git commit -m "Mi actualización genial"
git push
```

---

## 📅 Historial Reciente de Mejoras y Refactorizaciones Avanzadas

- **Auditoría de Seguridad y Limpieza:** Se removieron librerías front-end inactivas (`framer-motion`, `prop-types`), se purgó código de testeo obsoleto y se implementó `rehype-sanitize`.
- **Nivelación del Motor de Blog:** Se construyó un panel de redacción de doble pantalla (Live Preview) para que el administrador previsualice exactamente cómo se verá la noticia en los dispositivos de sus clientes antes de publicar.
- **Auditoría de Acciones y Autoría Dinámica:** Se implementó una lógica de rastreo de firmas (`👤 Por: NombreVisible`) que cruza a los administradores activos con el contenido publicado.
- **Rediseño Premium Soft UI:** Reestructuración de zonas táctiles para móviles (Touch Targets de 44px), márgenes anti-notch para iPhone, sombras suaves, y una arquitectura CSS "Anti-Brutalista" que da a la aplicación un aspecto lujoso y liviano digno de una plataforma élite.
- **Zonas Administrativas Responsivas:** Conversión de tablas estáticas pesadas en contenedores dinámicos con "Scroll Horizontal" en móviles, permitiendo al administrador registrar pagos y asistencias fluidamente desde su celular en el Dojang sin usar computadora.
