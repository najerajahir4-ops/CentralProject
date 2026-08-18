import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate, Img, staticFile } from "remotion";
import { Pointer } from "lucide-react";

export const CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrada con rebote de la escena
  const scale = spring({ fps, frame, config: { damping: 14, mass: 0.9 } });

  // Botón pulsando (inicia en frame 15)
  const buttonPulse = Math.sin(Math.max(0, frame - 15) / 4) * 0.05 + 1;

  // Animación del logo real
  const logoScale = spring({ fps, frame: frame - 10, config: { damping: 12, mass: 1 } });

  // Animación del cursor interactivo (blanco)
  const cursorX = interpolate(frame, [15, 30], [200, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cursorY = interpolate(frame, [15, 30], [200, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cursorClickScale = spring({ fps, frame: frame - 30, config: { damping: 10, stiffness: 200 } });
  const finalCursorScale = interpolate(cursorClickScale, [0, 0.5, 1], [1, 0.8, 1]);

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", zIndex: 10 }}>
      <div style={{ 
        transform: `scale(${scale})`, 
        textAlign: "center", 
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <h1 style={{ fontSize: 60, fontWeight: "800", color: "#F5F5F5", margin: 0, letterSpacing: "2px", textTransform: "uppercase" }}>
          Inicia hoy tu
        </h1>
        <h1 style={{ fontSize: 110, fontWeight: "900", color: "#FFFFFF", margin: "10px 0 40px 0", lineHeight: 1.1 }}>
          CLASE DE PRUEBA<br/>GRATIS
        </h1>

        {/* LOGO REAL DEL CLUB (Opción B: Justo encima del CTA) */}
        <div style={{ transform: `scale(${logoScale})`, marginBottom: "50px" }}>
          <Img src={staticFile("real_logo.png")} style={{ height: "180px", objectFit: "contain" }} />
        </div>
        
        {/* Botón CTA animado (Rojo Impacto) */}
        <div style={{ 
          transform: `scale(${buttonPulse})`,
          background: "#E60000",
          border: "2px solid #FFFFFF",
          padding: "30px 40px",
          color: "#FFFFFF",
          fontSize: 45,
          fontWeight: "800",
          boxShadow: "0 10px 40px rgba(230, 0, 0, 0.5)",
          display: "inline-block",
          position: "relative"
        }}>
          ENLACE EN EL PERFIL
          
          {/* Cursor interactivo animado (Blanco/Negro) */}
          {frame > 15 && (
            <div style={{ 
              position: "absolute", 
              bottom: "-40px", 
              right: "-40px", 
              transform: `translate(${cursorX}px, ${cursorY}px) scale(${finalCursorScale})`,
              filter: "drop-shadow(0 10px 10px rgba(0,0,0,0.5))"
            }}>
              <Pointer size={100} color="#0D0D0D" fill="#FFFFFF" strokeWidth={1.5} />
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};
