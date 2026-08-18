import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

export const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  
  // Asume 480 frames totales
  const widthPercent = interpolate(frame, [0, 480], [0, 100], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ zIndex: 100, pointerEvents: "none" }}>
      <div 
        style={{ 
          position: "absolute", 
          bottom: 0, 
          left: 0, 
          height: "8px", 
          width: `${widthPercent}%`, 
          background: "#38BDF8", // Celeste brillante
          boxShadow: "0 0 10px #38BDF8"
        }} 
      />
    </AbsoluteFill>
  );
};
