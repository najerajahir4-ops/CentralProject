# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Niños, adolescentes y adultos que buscan formación integral en artes marciales, así como padres de familia que inscriben a sus hijos para desarrollar disciplina, respeto y habilidades físicas.

## Product Purpose
Una página oficial y portal administrativo para Club Central, una academia de Taekwondo y Kickboxing. Su propósito es reclutar nuevos alumnos mostrando autoridad y profesionalismo, y proveer un área técnica para que los administradores gestionen inscripciones y pagos.

## Positioning
Formación integral en Taekwondo Olímpico y Kickboxing de alto rendimiento con estricta disciplina marcial. Combina la formación de campeones élite con clases accesibles para todas las edades desde los 4 años.

## Operating Context
Los usuarios visitarán la página desde móviles y computadoras para consultar los horarios, conocer a los profesores (Diego Pérez y Mauricio Almeida) y encontrar la ubicación del dojang.

## Capabilities and Constraints
Frontend en React/Vite, Backend en Express/Prisma, Base de Datos en Supabase PostgreSQL. La página debe cargar rápido, mostrar el horario de clases, contar con un Centro Legal conforme a la normativa ecuatoriana (LOPDP) y permitir inicio de sesión administrativo para gestionar estudiantes.

## Brand Commitments
- Nombre Oficial: Club Central
- Profesores: Diego Pérez y Mauricio Almeida
- Identidad Visual: Escudo oficial con colores blanco, rojo vibrante y negro carbón. Se debe evitar un diseño genérico basado en contenedores. El fondo principal debe ser blanco institucional para representar la pureza marcial, enriquecido con la pincelada marcial dinámica (`/martial-brush.webp`) detrás del escudo oficial.
- Regla de Diseño Estricta: PROHIBIDO USAR BADGES / PÍLDORAS FLOTANTES ("tarjets"). Jamás colocar etiquetas o píldoras redondeadas decorativas encima de los títulos principales. Los títulos deben ir directos, limpios y contundentes.
- Tipografía del Hero: `Oswald` (peso 700 bold, mayúsculas sostenidas, tracking de 4px) estructurado en dos líneas lógicas (`CLUB FORMATIVO` / `ESPECIALIZADO CENTRAL`).
- Tipografía Legal: En el Centro Legal (`/legal`) y documentos formales, se utiliza estrictamente `font-body` (Inter) con pesos ejecutivos (`font-bold` y `font-semibold`) y capitalización natural (*Title Case*), prohibiendo el uso de fuentes display o deportivas pesadas como `Anton`.
- Centro Legal & Normativa LOPDP: Sección pública accesible desde el pie de página con 5 documentos institucionales: Política de Privacidad (LOPDP), Términos del Dojang, Descargo Deportivo/Médico (Waiver), Uso de Imagen de Menores y Política de Cookies Técnicas sin rastreo publicitario.
- Animaciones y Micro-interacciones: Animaciones de entrada escalonadas y micro-interacciones interactivas en tarjetas (*hover elevation*, realce de bordes e indicadores activos), garantizando que las animaciones web no se bloqueen por configuraciones de rendimiento del sistema.
- Logo e Insignia: Uso de `/logo.png` de alta resolución optimizado para pantallas retina.
