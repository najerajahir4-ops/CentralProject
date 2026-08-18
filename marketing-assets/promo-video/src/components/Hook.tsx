import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate, Img, staticFile } from "remotion";

export const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animación del texto superior
  const topTextScale = spring({
    fps,
    frame,
    config: { damping: 14, mass: 0.8 },
  });

  // Animación del Badge "MUCHA ENERGÍA" (entra en el frame 20 aprox con más fuerza)
  const badgeFrame = frame - 20;
  const badgeScale = spring({
    fps,
    frame: Math.max(0, badgeFrame),
    config: { damping: 10, mass: 1.2, stiffness: 120 },
  });

  // Desvanecimiento suave al final
  const opacityOut = interpolate(frame, [75, 90], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: opacityOut, zIndex: 10 }}>
      <AbsoluteFill>
        <Img 
          src={staticFile("taekwondo_hero.png")} 
          style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(100%)" }} 
        />
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0, bottom: 0,
          background: "linear-gradient(to bottom, rgba(13, 13, 13, 0.9) 0%, rgba(13, 13, 13, 0.6) 100%)"
        }} />
      </AbsoluteFill>

      <div style={{ textAlign: "center", zIndex: 20 }}>
        <h1 
          style={{ 
            transform: `scale(${topTextScale})`, 
            fontSize: 90, 
            fontWeight: "800", 
            margin: 0, 
            textTransform: "uppercase", 
            color: "#FFFFFF", 
          }}
        >
          ¿TU HIJO TIENE
        </h1>
        
        {badgeFrame >= 0 && (
          <h1 
            style={{ 
              transform: `scale(${badgeScale})`, 
              fontSize: 130, 
              fontWeight: "900", 
              margin: 0, 
              textTransform: "uppercase", 
              color: "#E60000", 
              marginTop: 20,
              textShadow: "0 10px 40px rgba(230, 0, 0, 0.5)"
            }}
          >
            MUCHA ENERGÍA?
          </h1>
        )}
      </div>
    </AbsoluteFill>
  );
};
