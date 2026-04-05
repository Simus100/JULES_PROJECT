import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { useMemo } from "react";

const { fontFamily } = loadFont();

export const Intro = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({
    frame: frame - 15,
    fps,
    config: { damping: 12 },
  });

  const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  const subOpacity = interpolate(frame, [45, 60], [0, 1], {
    extrapolateRight: "clamp",
  });

  const subY = interpolate(frame, [45, 60], [20, 0], {
    extrapolateRight: "clamp",
  });

  const outOpacity = interpolate(frame, [270, 300], [1, 0], {
    extrapolateRight: "clamp",
  });

  const style = useMemo(() => {
    return {
      fontFamily,
      opacity: outOpacity,
    };
  }, [fontFamily, outOpacity]);

  return (
    <AbsoluteFill className="bg-zinc-950 items-center justify-center text-white" style={style}>
      <div
        style={{
          transform: `scale(${titleScale})`,
          opacity: titleOpacity,
        }}
        className="text-8xl font-black tracking-tighter"
      >
        AION NEXUS
      </div>

      <div
        style={{
          opacity: subOpacity,
          transform: `translateY(${subY}px)`,
        }}
        className="mt-6 text-2xl text-zinc-400 font-medium tracking-wide uppercase"
      >
        Automation Intelligence by Universalis Produzioni
      </div>
    </AbsoluteFill>
  );
};
