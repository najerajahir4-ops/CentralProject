import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { Users, CalendarDays } from "lucide-react";

export const InfoData: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entradas escalonadas desde la izquierda
  const slideIn1 = spring({ fps, frame, config: { damping: 15, mass: 1.2 } });
  const slideIn2 = spring({ fps, frame: frame - 15, config: { damping: 15, mass: 1.2 } });

  // Fade out al final
  const opacityOut = interpolate(frame, [75, 90], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: opacityOut, zIndex: 10 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "80px", width: "80%" }}>
        
        {/* Edades */}
        <div style={{ display: "flex", alignItems: "center", gap: "40px", transform: `translateX(${(1 - slideIn1) * -1000}px)` }}>
          <div style={{ padding: 20, border: "2px solid #FFFFFF", borderRadius: "50%" }}>
            <Users size={70} color="#FFFFFF" strokeWidth={1.5} />
          </div>
          <div>
            <h3 style={{ fontSize: 50, fontWeight: "900", margin: 0, color: "#FFFFFF", textTransform: "uppercase" }}>Grupos por Edades</h3>
            <p style={{ fontSize: 40, fontWeight: "500", margin: "10px 0 0 0", color: "#F5F5F5", opacity: 0.8 }}>
              Infantil (4-10) y Juvenil/Adultos (11+)
            </p>
          </div>
        </div>

        {/* Horarios */}
        <div style={{ display: "flex", alignItems: "center", gap: "40px", transform: `translateX(${(1 - slideIn2) * -1000}px)` }}>
          <div style={{ padding: 20, border: "2px solid #E60000", borderRadius: "50%" }}>
            <CalendarDays size={70} color="#E60000" strokeWidth={1.5} />
          </div>
          <div>
            <h3 style={{ fontSize: 50, fontWeight: "900", margin: 0, color: "#E60000", textTransform: "uppercase" }}>Horarios Flexibles</h3>
            <p style={{ fontSize: 40, fontWeight: "500", margin: "10px 0 0 0", color: "#F5F5F5", opacity: 0.8 }}>
              Mañanas, Tardes y Sábados
            </p>
          </div>
        </div>

      </div>
    </AbsoluteFill>
  );
};
