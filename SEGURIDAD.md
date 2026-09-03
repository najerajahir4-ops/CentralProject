# 🛡️ Manual de Seguridad y Registro de Hardening DevSecOps

Este documento recopila la **auditoría integral de seguridad**, el **historial de cambios de hardening** implementados y las **directrices operativas** para mantener la seguridad de la plataforma **Club Central (Taekwondo & Kickboxing)** en producción.

---

## 1. Resumen Ejecutivo del Estado de Seguridad

* **Arquitectura:** Monorepo Full-Stack desacoplado (`React 18 / Vite` + `Node.js / Express / Prisma ORM` + `Supabase PostgreSQL` + `Cloudinary` + `Vercel Serverless`).
* **Estado General:** ✅ **Auditado y Blindado** bajo lineamientos de **OWASP Top 10 Web** y **OWASP API Security Top 10**.
* **Prueba de Integridad:** Compilación de producción validada al 100% sin errores (`npm run build -w client`).

---

## 2. Checklist y Matriz de Estado (Antes vs. Después)

| # | Área de Control | Estado Inicial | Acción Implementada | Estado Final |
| :---: | :--- | :---: | :--- | :---: |
| **1** | **Cabeceras HTTP de Seguridad** | ⚠️ Básico (solo CSP) | Se añadieron HSTS (2 años), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Permissions-Policy` y `Referrer-Policy`. | ✅ **Blindado** |
| **2** | **Ocultación de Tecnología (Fingerprinting)** | ❌ Expuesto | Deshabilitada cabecera `X-Powered-By` en Express y activado `hidePoweredBy` en Helmet. | ✅ **Oculto** |
| **3** | **Protección CSRF en Perfiles** | ⚠️ Incompleto | El endpoint `PUT /api/auth/profile` no requería token anti-CSRF. Se vinculó `csrfMiddleware`. | ✅ **Protegido** |
| **4** | **Principio de Mínimo Privilegio en BD** | ⚠️ Superusuario `postgres` | Creado y configurado el rol `app_user` en Supabase PostgreSQL con permisos DML limitados. | ✅ **Configurado** |
| **5** | **Almacenamiento Cloudinary** | ⚠️ Carpeta antigua | Migrada la ruta de subida a `clubcentral_uploads` para aislar los archivos del nuevo Dojang. | ✅ **Aislado** |
| **6** | **Reporte de Vulnerabilidades (RFC 9116)** | ❌ Inexistente | Creado el archivo estandarizado `/.well-known/security.txt` con canales de contacto. | ✅ **Implementado** |
| **7** | **Dependencias de Navegación** | ⚠️ Versión con avisos | Actualizado `@remix-run/router` y `react-router-dom` a versiones con parches de seguridad. | ✅ **Actualizado** |
| **8** | **Renderizado Seguro contra XSS** | ✅ Conforme | Confirmada la ausencia de `dangerouslySetInnerHTML` y uso de `rehype-sanitize` + `rehype-raw`. | ✅ **Verificado** |
| **9** | **Aislamiento de Puertos y Servicios** | ✅ Conforme | Sin puertos de bases de datos expuestos en interfaces públicas (`0.0.0.0`). Acceso exclusivo vía TLS. | ✅ **Verificado** |
| **10** | **Filtrado y Rate Limiting** | ✅ Conforme | Límites activos: 200 req/15min en API global, 5 intentos/15min en login y 10 uploads/15min. | ✅ **Activo** |
| **11** | **Cumplimiento Legal y Privacidad (LOPDP Ecuador)** | ❌ Inexistente | Desplegado Centro Legal público (`/legal`) con LOPDP, Waiver, consentimiento de imagen y política de cookies con garantía de Cero Rastreo Publicitario. | ✅ **Conforme** |

---

## 3. Detalle de Cambios Técnicos Realizados

### A. Cabeceras de Seguridad en Edge (`vercel.json`)
Se reforzó el archivo [vercel.json](file:///c:/Users/najer/OneDrive/Desktop/PROYECTOS_FAMILIA/PROYECTOS/CLUB_CENTRAL/vercel.json) con cabeceras que se aplican automáticamente en la red perimetral de Vercel:

```json
{
  "key": "Strict-Transport-Security",
  "value": "max-age=63072000; includeSubDomains; preload"
},
{
  "key": "X-Content-Type-Options",
  "value": "nosniff"
},
{
  "key": "X-Frame-Options",
  "value": "DENY"
},
{
  "key": "Referrer-Policy",
  "value": "strict-origin-when-cross-origin"
},
{
  "key": "Permissions-Policy",
  "value": "camera=(), microphone=(), geolocation=(), payment=(), usb=()"
}
```
* **Efecto:** Impide ataques de Clickjacking (la web no puede ser embebida en iframes externos), bloquea ataques de confusión de tipo MIME y obliga a los navegadores a usar HTTPS durante 2 años.

---

### B. Hardening del Servidor Express (`server/src/index.js`)
Se modificó [server/src/index.js](file:///c:/Users/najer/OneDrive/Desktop/NUEVA_ACADEMIA_BASE/server/src/index.js) para eliminar firmas del servidor:
* `app.disable('x-powered-by');` evita que el atacante identifique que la API corre bajo Express.
* Se activaron los módulos de Helmet: `hidePoweredBy`, `noSniff`, `xssFilter` y `frameguard: { action: "deny" }`.

---

### C. Protección Anti-CSRF en Autenticación (`server/src/routes/authRoutes.js`)
* Se agregó el middleware de *Double Submit Cookie* (`csrfMiddleware`) a la ruta:
  ```javascript
  router.put('/profile', authMiddleware, csrfMiddleware, updateProfile);
  ```
* **Efecto:** Ningún atacante externo puede engañar al navegador de un administrador autenticado para cambiar su nombre de usuario o credenciales sin enviar el token secreto `X-CSRF-Token`.

---

### D. Aislamiento Multimedia en Cloudinary (`server/src/routes/uploadRoutes.js`)
* Se configuró el almacenamiento de Multer con Cloudinary para apuntar a:
  ```javascript
  folder: 'clubcentral_uploads'
  ```
* **Efecto:** Organiza las fotos de carnets, galerías de campeonatos y comprobantes dentro del bucket propio de Club Central, dejando intactas las URLs previamente registradas en la base de datos.

---

### E. Mínimo Privilegio en PostgreSQL (Supabase)
Se ejecutó en la base de datos de producción la creación y asignación de permisos para un rol de aplicación dedicado (`app_user`):

```sql
-- Rol de aplicación creado en PostgreSQL
CREATE ROLE app_user WITH LOGIN PASSWORD '[DEFINIR_EN_VARIABLES_DE_ENTORNO]';

-- Permisos estrictamente limitados a lectura y escritura (sin ALTER ni DROP)
GRANT USAGE ON SCHEMA public TO app_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_user;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO app_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO app_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT ON SEQUENCES TO app_user;
```

---

### F. Divulgación Responsable de Seguridad (`client/public/.well-known/security.txt`)
Se añadió el estándar internacional **RFC 9116** en [client/public/.well-known/security.txt](file:///c:/Users/najer/OneDrive/Desktop/PROYECTOS_FAMILIA/PROYECTOS/CLUB_CENTRAL/client/public/.well-known/security.txt) para que investigadores de seguridad ética puedan contactar al equipo técnico antes de reportar cualquier hallazgo públicamente:
```text
Contact: mailto:seguridad@clubcentraltkd.com
Expires: 2027-12-31T23:59:59.000Z
Preferred-Languages: es, en
Canonical: https://clubcentraltkd.com/.well-known/security.txt
Policy: https://clubcentraltkd.com/politica-de-seguridad
```

---

### G. Centro Legal & Política de Cookies sin Rastreo (`client/src/pages/LegalHub.jsx`)
* **Conformidad con la LOPDP de Ecuador:** Se diseñó el portal legal en `/legal` que norma el tratamiento responsable de datos personales y sensibles (como fichas médicas de deportistas, alergias y contactos de emergencia según el Art. 25 LOPDP), incorporando el procedimiento formal para el ejercicio de derechos ARCO.
* **Transparencia y Cero Rastreo Publicitario:** Se sustituyó la jerga cruda de programación por una política de cookies comprensible y formal. Se garantiza explícitamente la ausencia de cookies de remarketing, píxeles de terceros o venta de perfiles digitales, limitando el almacenamiento a cookies técnicas y de sesión estrictamente necesarias.

---

## 4. Guía Operativa para el Administrador

### ¿Cómo alternar entre el usuario de aplicación y migraciones?
* **En el archivo `.env` o en las Variables de Entorno de Vercel:**
  * **`DIRECT_URL`**: Debe mantener siempre las credenciales del superusuario (`postgres`) porque Prisma necesita permisos para crear o modificar tablas (`prisma db push`, `prisma migrate`).
  * **`DATABASE_URL`**: Puedes usar `app_user` para el tráfico habitual de la API web o mantener la conexión transaccional con PgBouncer.

### Buenas Prácticas al Comprar o Configurar el Dominio en Hostinger:
Para evitar que atacantes envíen correos haciéndose pasar por `clubcentraltkd.com`:
1. **SPF (Sender Policy Framework):**
   * Tipo: `TXT` | Host: `@` | Valor: `v=spf1 include:_spf.hostinger.com ~all`
2. **DMARC:**
   * Tipo: `TXT` | Host: `_dmarc` | Valor: `v=DMARC1; p=quarantine; rua=mailto:seguridad@clubcentraltkd.com`

---

## 5. Verificación de Integridad

Para verificar que el sistema continúe cumpliendo los estándares de seguridad antes de cualquier despliegue:

```bash
# 1. Auditoría de dependencias
npm audit

# 2. Compilación limpia del frontend
npm run build -w client

# 3. Comprobación de estado git (asegurar que .env no esté incluido)
git status
```
