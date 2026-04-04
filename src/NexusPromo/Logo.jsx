import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import React from "react";

export const Logo = ({ delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    fps,
    frame: frame - delay,
    config: { damping: 12, mass: 0.5 },
  });

  const opacity = spring({
    fps,
    frame: frame - delay,
    config: { damping: 100 },
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          opacity,
          transform: `scale(${scale})`,
        }}
      >
        <div style={{
          fontSize: 150,
          fontWeight: 900,
          fontFamily: "Inter, sans-serif",
          background: "linear-gradient(to right, #00f2fe 0%, #4facfe 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: "10px",
          textShadow: "0px 0px 30px rgba(0, 242, 254, 0.4)",
        }}>
          AION NEXUS
        </div>
        <div style={{
          fontSize: 40,
          fontWeight: 300,
          fontFamily: "Inter, sans-serif",
          color: "#aaa",
          marginTop: 20,
          letterSpacing: "5px",
        }}>
          AUTOMATION INTELLIGENCE
        </div>
      </div>
    </AbsoluteFill>
  );
};