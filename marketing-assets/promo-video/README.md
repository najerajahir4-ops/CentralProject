# 🎬 Reel Promocional del Club (Remotion)

Este directorio contiene el código fuente para generar programáticamente el **Video Promocional Oficial (Reel/TikTok de 15 segundos)** del Club Formativo Central usando [Remotion](https://www.remotion.dev/).

## 🎯 Objetivo
Generar un video dinámico, de corte publicitario, con alta jerarquía visual, para captación de nuevos estudiantes en redes sociales (TikTok, Instagram Reels, YouTube Shorts).

## 🎨 Dirección de Arte
- **Resolución:** Vertical 9:16 (1080x1920) a 30 FPS.
- **Paleta de Colores Corporativa:** Blanco (`#FFFFFF`), Negro/Carbono (`#0D0D0D`), Gris Claro (`#F5F5F5`), con un único acento en **Rojo Institucional (`#E60000`)** (basado en la bandera Tsáchila de Santo Domingo).
- **Tipografía:** Brutalista y asimétrica, textos alineados a la izquierda y escalados dinámicamente.
- **Fondos:** Imágenes reales del dojang con filtros de escala de grises y gradientes superpuestos oscuros.
- **Iconografía:** Clean SVG con `lucide-react` (sin emojis de sistema).

## 🗂️ Estructura del Video (Escenas)
El archivo principal de la composición es `src/PromoClub.tsx`, que secuencia los siguientes componentes (ubicados en `src/components/`):

1. **`Hook.tsx` (0s - 3s):** Gancho inicial con la pregunta "¿Tu hijo tiene MUCHA ENERGÍA?".
2. **`PromoClub.tsx` (Intro) (3s - 6s):** Presentación del Club Formativo Central.
3. **`BenefitCards.tsx` (6s - 10s):** Beneficios listados: Taekwondo Olímpico, Disciplina y Respeto, Autoconfianza.
4. **`InfoData.tsx` (10s - 13s):** Edades y horarios flexibles.
5. **`CTA.tsx` (13s - 15s):** Call To Action ("Clase de Prueba Gratis"), revelación del **Logotipo Oficial** y animación del cursor hacia el botón de "Enlace en el perfil".

## 🎵 Audio y Recursos (`public/`)
Los archivos multimedia (como el MP3 de fondo *Eye Of The Tiger* y el logo real) deben alojarse en la carpeta `public/` para que `ffprobe` y `ffmpeg` empaqueten ambos streams correctamente durante el renderizado.

## 🚀 Comandos Útiles

**Iniciar servidor de desarrollo (Previsualización en vivo):**
```bash
npm run dev
```

**Extraer un frame estático de prueba (ej. frame 250):**
```bash
npx remotion still src/index.ts PromoTaekwondo out/frame.png --frame=250
```

**Renderizar video final en MP4:**
```bash
npx remotion render src/index.ts PromoTaekwondo out/video.mp4
```
