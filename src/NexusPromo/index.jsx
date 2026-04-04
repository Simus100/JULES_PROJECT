import { AbsoluteFill, Sequence, Audio, staticFile } from "remotion";
import React from "react";
import { Background } from "./Background";
import { Typography, GlitchText } from "./Typography";
import { Logo } from "./Logo";

export const NexusPromo = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <Background />

      {/* Audio Track */}
      <Audio src={staticFile("audio.mp3")} volume={0.8} />

      {/* Scene 1: The Hook (0 - 300 frames, 0-10s) */}
      <Sequence durationInFrames={300}>
        <Sequence from={30} durationInFrames={120}>
          <Typography text="Il mondo evolve velocemente." />
        </Sequence>
        <Sequence from={150} durationInFrames={150}>
          <Typography text="Le informazioni, ancora di più." />
        </Sequence>
      </Sequence>

      {/* Scene 2: The Reveal (300 - 750 frames, 10-25s) */}
      <Sequence from={300} durationInFrames={450}>
        <Sequence durationInFrames={100}>
          <GlitchText text="Troppo rumore." />
        </Sequence>
        <Sequence from={100} durationInFrames={100}>
          <Typography text="La soluzione." />
        </Sequence>
        <Sequence from={200} durationInFrames={250}>
          <Logo />
        </Sequence>
      </Sequence>

      {/* Scene 3: The Value (750 - 1350 frames, 25-45s) */}
      <Sequence from={750} durationInFrames={600}>
        <Sequence durationInFrames={150}>
          <Typography text="Intelligenza Artificiale" style={{ color: "#00f2fe" }} />
        </Sequence>
        <Sequence from={150} durationInFrames={150}>
          <Typography text="Geopolitica & Finanza" style={{ color: "#00f2fe" }} />
        </Sequence>
        <Sequence from={300} durationInFrames={150}>
          <Typography
            text="Un flusso editoriale gestito dall'AI."
            style={{ fontSize: 60 }}
          />
        </Sequence>
        <Sequence from={450} durationInFrames={150}>
          <Typography
            text="By Universalis Produzioni"
            style={{ fontSize: 50, color: "#aaa" }}
          />
        </Sequence>
      </Sequence>

      {/* Scene 4: The CTA (1350 - 1800 frames, 45-60s) */}
      <Sequence from={1350} durationInFrames={450}>
        <Sequence durationInFrames={150}>
          <Typography text="Le notizie che contano." />
        </Sequence>
        <Sequence from={150} durationInFrames={300}>
          <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
            <Typography
              text="Scopri il futuro dell'informazione"
              style={{ fontSize: 50, marginBottom: 150 }}
            />
            <Typography
              text="nexus.universalis.it"
              delay={30}
              style={{
                fontSize: 80,
                color: "#00f2fe",
                textShadow: "0px 0px 20px rgba(0, 242, 254, 0.8)",
                marginTop: 100
              }}
            />
          </AbsoluteFill>
        </Sequence>
      </Sequence>
    </AbsoluteFill>
  );
};