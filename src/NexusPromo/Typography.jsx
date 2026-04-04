import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import React from "react";

export const Typography = ({ text, delay = 0, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = spring({
    fps,
    frame: frame - delay,
    config: { damping: 100 },
  });

  const translateY = spring({
    fps,
    frame: frame - delay,
    config: { damping: 100 },
    from: 50,
    to: 0,
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
          opacity,
          transform: `translateY(${translateY}px)`,
          fontFamily: "Inter, sans-serif",
          fontSize: 80,
          fontWeight: "bold",
          color: "white",
          textAlign: "center",
          textShadow: "0px 0px 10px rgba(255,255,255,0.5)",
          ...style,
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};

export const GlitchText = ({ text, delay = 0, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const isGlitching = (frame - delay) > 0 && (frame - delay) < 30;

  const randomX = isGlitching ? (Math.random() - 0.5) * 20 : 0;
  const randomY = isGlitching ? (Math.random() - 0.5) * 20 : 0;

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
          opacity,
          transform: `translate(${randomX}px, ${randomY}px)`,
          fontFamily: "Inter, sans-serif",
          fontSize: 100,
          fontWeight: "bold",
          color: "white",
          textAlign: "center",
          textShadow: isGlitching ? "5px 0px 0px red, -5px 0px 0px cyan" : "0px 0px 10px rgba(255,255,255,0.5)",
          ...style,
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};
