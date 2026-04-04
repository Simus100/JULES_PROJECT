import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import React from "react";
import { User } from "lucide-react";

export const LowerThird = ({
  name = "John Doe",
  title = "Software Engineer",
  color = "#ffffff",
  accentColor = "#3b82f6",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    fps,
    frame,
    config: {
      damping: 14,
    },
  });

  const textProgress = spring({
    fps,
    frame: frame - 15,
    config: {
      damping: 14,
    },
  });

  return (
    <div
      style={{
        position: "absolute",
        bottom: 100,
        left: 100,
        display: "flex",
        alignItems: "center",
        gap: 30,
      }}
    >
      <div
        style={{
          width: 120 * progress,
          height: 120 * progress,
          borderRadius: "50%",
          backgroundColor: accentColor,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
        }}
      >
        <User size={60} color="#fff" style={{ opacity: progress }} />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          overflow: "hidden",
          height: 150,
        }}
      >
        <div
          style={{
            fontFamily: "sans-serif",
            fontSize: 60,
            fontWeight: "bold",
            color,
            textShadow: "0 4px 10px rgba(0,0,0,0.5)",
            transform: `translateY(${100 - 100 * textProgress}px)`,
            opacity: textProgress,
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontFamily: "sans-serif",
            fontSize: 35,
            color: "rgba(255, 255, 255, 0.8)",
            textShadow: "0 2px 5px rgba(0,0,0,0.5)",
            transform: `translateY(${100 - 100 * textProgress}px)`,
            opacity: textProgress,
            marginTop: 10,
          }}
        >
          {title}
        </div>
      </div>
    </div>
  );
};
