import { noise2D } from "@remotion/noise";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import React, { useId } from "react";

export const NoiseBackground = ({
  color1 = "#ff00cc",
  color2 = "#333399",
  speed = 0.005,
  circleRadius = 800,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const gradientId = useId();

  const offsetX = noise2D("x", frame * speed) * 200;
  const offsetY = noise2D("y", frame * speed) * 200;

  return (
    <AbsoluteFill style={{ backgroundColor: color2 }}>
      <svg width={width} height={height} style={{ filter: "blur(100px)" }}>
        <defs>
          <radialGradient id={gradientId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={color1} stopOpacity={1} />
            <stop offset="100%" stopColor={color1} stopOpacity={0} />
          </radialGradient>
        </defs>
        <circle
          cx={width / 2 + offsetX}
          cy={height / 2 + offsetY}
          r={circleRadius}
          fill={`url(#${gradientId})`}
        />
      </svg>
    </AbsoluteFill>
  );
};
