import { useMemo } from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT_FAMILY } from "./constants";

const title = {
  fontFamily: FONT_FAMILY,
  fontWeight: "bold",
  fontSize: 100,
  textAlign: "center",
  position: "absolute",
  bottom: 160,
  width: "100%",
};

const word = {
  marginLeft: 10,
  marginRight: 10,
  display: "inline-block",
};

export const Title = ({ titleText, titleColor }) => {
  const videoConfig = useVideoConfig();
  const frame = useCurrentFrame();

  // ⚡ Bolt: Memoize the derived array so we don't re-allocate
  // `words` array strings 30+ times per second in the hot render loop.
  // Impact: Reduced garbage collection pauses and memory churn per frame.
  const words = useMemo(() => titleText.split(" "), [titleText]);

  return (
    <h1 style={title}>
      {words.map((t, i) => {
        const delay = i * 5;

        const scale = spring({
          fps: videoConfig.fps,
          frame: frame - delay,
          config: {
            damping: 200,
          },
        });

        return (
          <span
            key={t}
            style={{
              ...word,
              color: titleColor,
              transform: `scale(${scale})`,
            }}
          >
            {t}
          </span>
        );
      })}
    </h1>
  );
};
