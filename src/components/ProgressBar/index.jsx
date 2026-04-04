import { useCurrentFrame, useVideoConfig } from "remotion";
import React from "react";

export const ProgressBar = ({
  color = "#3b82f6",
  height = 20,
  position = "bottom", // "top" or "bottom"
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames, width } = useVideoConfig();

  const progress = frame / durationInFrames;

  return (
    <div
      style={{
        position: "absolute",
        [position]: 0,
        left: 0,
        width: width * progress,
        height,
        backgroundColor: color,
        boxShadow: "0 0 20px rgba(0,0,0,0.5)",
      }}
    />
  );
};
