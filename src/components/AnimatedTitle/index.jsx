import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import React from "react";

export const AnimatedTitle = ({
  titleText = "Your Title Here",
  titleColor = "#ffffff",
  fontFamily = "sans-serif",
  fontSize = 120,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Word by word animation
  const words = titleText.split(" ");

  return (
    <h1
      style={{
        fontFamily,
        fontSize,
        fontWeight: "bold",
        color: titleColor,
        textAlign: "center",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "30px",
        margin: 0,
        textShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)",
      }}
    >
      {words.map((t, i) => {
        const delay = i * 5;
        const scale = spring({
          fps,
          frame: frame - delay,
          config: {
            damping: 12,
            stiffness: 200,
          },
        });

        const opacity = spring({
          fps,
          frame: frame - delay,
          config: {
            damping: 100,
            stiffness: 200,
          },
        });

        return (
          <span
            key={t}
            style={{
              transform: `scale(${scale})`,
              opacity,
              display: "inline-block",
            }}
          >
            {t}
          </span>
        );
      })}
    </h1>
  );
};
