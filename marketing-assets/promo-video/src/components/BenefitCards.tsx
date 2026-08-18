import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate, Img, staticFile } from "remotion";
import { Shield, Target, Flame } from "lucide-react";

export const BenefitCards: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // El título entra desde la izquierda agresivamente
  const slideTitle = spring({ fps, frame: frame, config: { damping: 16, mass: 1.5, stiffness: 100 } });
  
  // Staggering de los 3 beneficios (frames 15, 30, 45)
  const slideItem1 = spring({ fps, frame: frame - 15, config: { damping: 14, mass: 1.2 } });
  const slideItem2 = spring({ fps, frame: frame - 30, config: { damping: 14, mass: 1.2 } });
  const slideItem3 = spring({ fps, frame: frame - 45, config: { damping: 14, mass: 1.2 } });

  // Fade general al final
  const opacity = interpolate(frame, [120, 135], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0D0D0D", opacity, zIndex: 10, padding: "80px", justifyContent: "center" }}>
      
      {/* Fondo fotográfico con gradiente oscuro de protección (Carbon) */}
      <AbsoluteFill>
        <Img 
          src={staticFile("dojang_interior.png")} 
          style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(100%)" }} 
        />
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0, bottom: 0,
          background: "linear-gradient(to right, rgba(13, 13, 13, 0.95) 0%, rgba(13, 13, 13, 0.7) 100%)"
        }} />
      </AbsoluteFill>

      {/* Contenido principal (Alineado a la izquierda, asimétrico) */}
      <div style={{ position: "relative", zIndex: 20 }}>
        
        {/* Título gigante jerárquico */}
        <div style={{ transform: `translateX(${(1 - slideTitle) * -1000}px)`, marginBottom: "100px" }}>
          <h2 style={{ fontSize: 90, fontWeight: "900", color: "#FFFFFF", margin: 0, lineHeight: 1.1, textTransform: "uppercase", letterSpacing: "-2px" }}>
            ENFOQUE <span style={{ color: "#E60000" }}>TOTAL</span>
          </h2>
          <p style={{ fontSize: 45, color: "#F5F5F5", margin: "20px 0 0 0", fontWeight: "600", letterSpacing: "1px", opacity: 0.8 }}>
            Metodología Formativa Central
          </p>
        </div>

        {/* Lista de beneficios minimalista y limpia (sin cajas) */}
        <div style={{ display: "flex", flexDirection: "column", gap: "60px" }}>
          
          <div style={{ display: "flex", alignItems: "center", gap: "40px", transform: `translateX(${(1 - slideItem1) * -1000}px)` }}>
            <Target size={80} color="#FFFFFF" strokeWidth={1.5} />
            <div>
              <h3 style={{ margin: 0, fontSize: 60, color: "#FFFFFF", fontWeight: "800" }}>TAEKWONDO OLÍMPICO</h3>
              <p style={{ margin: "10px 0 0 0", fontSize: 35, color: "#F5F5F5", fontWeight: "500", opacity: 0.7 }}>Técnica, velocidad y precisión</p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "40px", transform: `translateX(${(1 - slideItem2) * -1000}px)` }}>
            <Shield size={80} color="#FFFFFF" strokeWidth={1.5} />
            <div>
              <h3 style={{ margin: 0, fontSize: 60, color: "#FFFFFF", fontWeight: "800" }}>DISCIPLINA Y RESPETO</h3>
              <p style={{ margin: "10px 0 0 0", fontSize: 35, color: "#F5F5F5", fontWeight: "500", opacity: 0.7 }}>Valores que cambian vidas</p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "40px", transform: `translateX(${(1 - slideItem3) * -1000}px)` }}>
            <Flame size={80} color="#FFFFFF" strokeWidth={1.5} />
            <div>
              <h3 style={{ margin: 0, fontSize: 60, color: "#FFFFFF", fontWeight: "800" }}>AUTOCONFIANZA</h3>
              <p style={{ margin: "10px 0 0 0", fontSize: 35, color: "#F5F5F5", fontWeight: "500", opacity: 0.7 }}>Seguridad en cada paso</p>
            </div>
          </div>

        </div>
      </div>
    </AbsoluteFill>
  );
};
