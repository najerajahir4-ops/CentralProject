import React from "react";
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame, useVideoConfig, Audio, staticFile } from "remotion";

import { AnimatedBackground } from "./components/AnimatedBackground";
import { ProgressBar } from "./components/ProgressBar";
import { Hook } from "./components/Hook";
import { BenefitCards } from "./components/BenefitCards";
import { InfoData } from "./components/InfoData";
import { CTA } from "./components/CTA";

export const PromoClub: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#020617", overflow: "hidden" }}>
      {/* Audio Real Track */}
      <Audio src={staticFile("eye_of_the_tiger.mp3")} />

      <AnimatedBackground />
      <ProgressBar />

      {/* Escena 1: Hook (0s - 3s) */}
      <Sequence from={0} durationInFrames={90}>
        <Hook />
      </Sequence>

      {/* Escena 2: Intro/Autoridad (3s - 6s) */}
      <Sequence from={90} durationInFrames={90}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          <h2 style={{ fontSize: 75, fontWeight: "800", color: "#FFFFFF", marginBottom: 70, textAlign: "center", lineHeight: 1.2 }}>
            En CLUB FORMATIVO CENTRAL<br />les enseñamos a enfocarla.
          </h2>
          <div style={{ border: "2px solid #E60000", color: "#F5F5F5", padding: "15px 40px", borderRadius: "50px", fontSize: 40, fontWeight: "bold", textTransform: "uppercase" }}>
            Formando campeones en Santo Domingo
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Escena 3: Beneficios (6s - 9.5s) */}
      <Sequence from={180} durationInFrames={105}>
        <BenefitCards />
      </Sequence>

      {/* Escena 4: Edades y Horarios (9.5s - 13s) */}
      <Sequence from={285} durationInFrames={105}>
        <InfoData />
      </Sequence>

      {/* Escena 5: CTA (13s - 15s) */}
      <Sequence from={390} durationInFrames={60}>
        <CTA />
      </Sequence>
    </AbsoluteFill>
  );
};
