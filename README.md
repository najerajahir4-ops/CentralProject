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

## 🛡️ Seguridad y Hardening Nivel Empresarial (OWASP Top 10 & API Security)

El sistema cuenta con una arquitectura de seguridad por capas auditada bajo los estándares **OWASP Web Top 10** y **OWASP API Security Top 10**:

* **Control de Acceso Estricto (BOLA / OWASP API1):** Todas las rutas CRUD de estudiantes (`/api/students`) y pagos (`/api/payments`) están completamente protegidas mediante `authMiddleware`. Las galerías públicas solo exponen recursos multimedia explícitamente autorizados.
* **Prevención de Exposición Excesiva de Datos (Overfetching / OWASP API3):** Las consultas públicas (como `/api/featured-students`) utilizan proyecciones `select` estrictas en Prisma, impidiendo que datos sensibles como cédulas, historiales de pago o fichas médicas se transmitan al cliente.
* **Política CORS con Whitelist Estricta:** Se eliminaron comodines permisivos. Solo se aceptan peticiones con credenciales desde orígenes autorizados exactos (`http://localhost:5173`, `http://127.0.0.1:5173`, `https://paginabryan-db.vercel.app` y `FRONTEND_URL`).
* **Soporte Proxy Inverso (`trust proxy`):** Express está configurado con `app.set('trust proxy', 1)`, permitiendo que los limitadores de tasa identifiquen con precisión las IPs de los clientes detrás de los balanceadores de carga de Vercel.
* **Subida Segura de Archivos (Multer + Cloudinary):**
  * Límite estricto de tamaño de archivo (máx. **5 MB**).
  * Validación de tipo MIME real (`image/jpeg`, `image/png`, `image/webp`).
  * Rate limiting dedicado para uploads (máx. 10 subidas por IP cada 15 minutos).
* **Protección contra Inyección en `<iframe>` y XSS (OWASP A03):** 
  * El visor de artículos sanitiza Markdown con `rehype-sanitize`.
  * Los videos embebidos (`iframe`) validan esquema `https://` y pertenencia a dominios autorizados (YouTube, Vimeo), aplicando además aislamiento `sandbox="allow-scripts allow-same-origin allow-presentation"`.
* **Manejo Seguro de Errores en Producción:** En entornos productivos (`NODE_ENV=production`), los errores 500 emiten mensajes genéricos al cliente para no filtrar esquemas de base de datos ni rutas de archivos del servidor, mientras que el stack trace se preserva en los logs internos.
* **Protección Anti Fuerza Bruta (Rate Limiting):**
  * Límite global de API: 200 peticiones / 15 min.
  * Límite de Login: 5 intentos fallidos / 15 min por IP.
* **Autenticación Robusta (JWT & Cookies `httpOnly`):** Tokens JWT firmados, expiración controlada y almacenamiento en cookies con directivas `httpOnly`, `secure` y `sameSite`.

---

## ⚙️ Variables de Entorno Requeridas

Crea un archivo `.env` en `/server` con los siguientes valores:

```env
# Puerto del servidor Express (opcional en Vercel)
PORT=5000

# Entorno: development | production
NODE_ENV=development

# Clave secreta para firma de JSON Web Tokens
JWT_SECRET=tu_clave_secreta_larga_y_aleatoria

# URL de conexión a la base de datos PostgreSQL
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require"
DIRECT_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

# URL de tu frontend en producción (para CORS)
FRONTEND_URL=https://paginabryan-db.vercel.app

# Credenciales de Cloudinary (para subida de imágenes)
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret

# Sembrado y administración (opcional para scripts de inicialización)
ADMIN_USER=admin
ADMIN_SEED_PASSWORD=tu_contraseña_segura_de_admin
```

---

## 🚀 Configuración Local y Despliegue (Vercel)

### Levantar el Proyecto Localmente:
1. Asegúrate de tener Node.js instalado (v18+ recomendado).
2. En la raíz del proyecto instala dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor backend (`/server`):
   ```bash
   cd server
   npx prisma generate
   npx prisma db push
   npm run dev
   ```
4. Inicia el cliente frontend (`/client`):
   ```bash
   cd ../client
   npm run dev
   ```

### Despliegue Continuo (CI/CD) en Vercel:
Este repositorio está estructurado como un **Monorepo** y conectado a Vercel:
- **Build Command:** `npm run build -w client && npm run prisma:push -w server`
- **Output Directory:** `client/dist`
- **Serverless API:** Las peticiones a `/api/*` se canalizan automáticamente hacia [api/index.js](file:///c:/Users/najer/OneDrive/Desktop/NUEVA_ACADEMIA_BASE/api/index.js).

Para desplegar cambios a producción:
```bash
git add .
git commit -m "feat: actualizar características y seguridad"
git push origin master
```

---

## 🌐 Guía: Cómo Vincular un Dominio Personalizado de Hostinger con Vercel

Cuando compres tu dominio en **Hostinger** (ejemplo: `clubcentraltkd.com`), sigue estos sencillos pasos para enlazarlo con tu proyecto en Vercel en menos de 5 minutos:

### 1. Agregar el Dominio en Vercel:
1. Ingresa a tu panel en [Vercel Dashboard](https://vercel.com/dashboard).
2. Selecciona tu proyecto (`central-project`).
3. Ve a **Settings** (pestaña superior) ➡️ **Domains** (menú lateral izquierdo).
4. Escribe tu dominio (ej. `tudominio.com`) y presiona **Add**.
5. Vercel te solicitará configurar dos registros DNS:
   - **Registro A** para el dominio raíz (`tudominio.com`).
   - **Registro CNAME** para el subdominio `www` (`www.tudominio.com`).

### 2. Configurar los Registros DNS en Hostinger (hPanel):
1. Inicia sesión en **Hostinger** y ve a la sección **Dominios**.
2. Haz clic en **Administrar** sobre tu dominio recién adquirido.
3. En el menú lateral, abre **DNS / Servidores de nombres (Zona DNS)**.
4. Agrega o edita los siguientes registros:

| Tipo | Nombre / Host | Valor / Destino | TTL |
| :--- | :---: | :---: | :---: |
| **A** | `@` | `76.76.21.21` | `300` (o automático) |
| **CNAME** | `www` | `cname.vercel-dns.com` | `300` (o automático) |

5. Guarda los cambios.

### 3. Verificación y Certificado SSL:
- En unos **5 a 15 minutos**, Vercel detectará la propagación DNS y mostrará el estado en verde ✅ **Valid Configuration**.
- Vercel generará e instalará automáticamente el certificado **SSL / HTTPS (candado de seguridad 🔒)** sin costo alguno.

### 4. Actualizar Variables de Entorno en Vercel:
Para que las políticas de CORS y seguridad reconozcan tu nuevo dominio oficial:
1. En Vercel: **Settings** ➡️ **Environment Variables**.
2. Modifica o crea la variable:
   - **Nombre:** `FRONTEND_URL`
   - **Valor:** `https://tudominio.com` (reemplaza por tu dominio real).
3. Realiza un *Redeploy* (o haz un nuevo push a GitHub) para aplicar los cambios.

---

## 📅 Historial Reciente de Mejoras y Hardening

- **Auditoría de Seguridad Integral (OWASP):** Implementación de control de acceso RBAC en todas las rutas de estudiantes, prevención de BOLA/Overfetching, CORS restringido a dominios explícitos y protección de subida de archivos (límite 5MB + MIME check + rate limiting).
- **Protección de Componentes Multimedia:** Validación estricta de URLs de video (`https://` + whitelist) con atributo `sandbox` en reproductores `<iframe>`.
- **Compatibilidad de Runtimes Vercel:** Soporte para múltiples motores de OpenSSL (`rhel-openssl-1.0.x` y `rhel-openssl-3.0.x`) en Prisma Client.
- **Limpieza de Secretos y Hardcoded Credentials:** Migración de scripts de inicialización (`update_admin.js`, `seed.js`) a variables de entorno con hash seguro `bcryptjs`.
- **Panel CMS con Live Preview:** Editor de contenidos de doble pantalla para visualización en tiempo real de artículos y comunicados del Dojang.
- **Diseño Móvil y Accesibilidad:** Optimización táctil de 44px, soporte nativo para Modo Oscuro/Claro y visualización responsiva para gestión desde smartphones.
- **Actualización de Información Pública:** Corrección de horarios segmentados (mañana/tarde/sábados), actualización de correo institucional, teléfono, y refactorización de coordenadas de Google Maps para mayor precisión.
- **Interfaz y UI Dinámica:** Integración de menú tipo acordeón animado en la sección Quiénes Somos para mejorar la experiencia en móviles.
- **Optimización de Rutas Públicas (Overfetching):** Creación de endpoints públicos segmentados para Galería (Salón de Campeones), Perfiles Individuales y Grados, garantizando la privacidad de los datos internos al no requerir autenticación para datos inocuos.
- **UX/UI Administrativo:** Habilitación de modal interactivo a pantalla completa para previsualización de la Galería de Progreso del estudiante, optimización de contrastes para legibilidad de textos sobre fotos, y contención con "custom scroll" en la Línea de Tiempo de Auditoría.
