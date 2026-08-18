import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Img, staticFile } from "remotion";

export const AnimatedBackground: React.FC = () => {
  const frame = useCurrentFrame();

  // Pulso radial (simula un destello o energía respirando)
  // Ciclo lento de 60 frames
  const pulse = Math.sin(frame / 20) * 0.15 + 0.85; 

  // Desplazamiento sutil del gradiente lineal base
  const bgPosition = interpolate(frame, [0, 480], [0, 50], {
    extrapolateRight: "clamp",
  });

  // Rotación lenta del logo de marca de agua
  const logoRotation = interpolate(frame, [0, 480], [0, 15]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, #0D0D0D ${bgPosition}%, #1A1A1A 100%)`,
        zIndex: 0,
      }}
    >
      {/* Luz radial pulsante */}
      <AbsoluteFill
        style={{
          background: "radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, transparent 70%)",
          opacity: pulse,
          mixBlendMode: "screen",
        }}
      />
      
      {/* Sello de agua del club rotando */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: 0.05 }}>
        <Img 
          src={staticFile("logo.png")} 
          style={{ 
            width: "180%", 
            height: "auto", 
            transform: `rotate(${logoRotation}deg)`,
            filter: "grayscale(100%) blur(5px)"
          }} 
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
