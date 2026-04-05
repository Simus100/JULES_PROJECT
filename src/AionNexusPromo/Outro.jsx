import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { useMemo } from "react";

const { fontFamily } = loadFont();

export const Outro = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  const urlScale = spring({
    frame: frame - 45,
    fps,
    config: { damping: 12 },
  });

  const style = useMemo(() => {
    return {
      fontFamily,
      opacity: fadeIn,
    };
  }, [fontFamily, fadeIn]);

  return (
    <AbsoluteFill className="bg-zinc-950 items-center justify-center text-white flex-col" style={style}>
      <h2 className="text-5xl md:text-7xl font-black mb-8 text-center text-zinc-100 tracking-tight">
        Scopri il futuro <br/> dell'informazione.
      </h2>

      <div
        style={{ transform: `scale(${urlScale})` }}
        className="mt-8 bg-blue-600 px-10 py-6 rounded-2xl shadow-[0_0_40px_rgba(37,99,235,0.4)]"
      >
        <span className="text-4xl md:text-5xl font-mono font-bold text-white tracking-wider">
          nexus.universalis.it
        </span>
      </div>

      <div className="absolute bottom-12 text-zinc-500 font-medium tracking-widest uppercase text-sm">
        Powered by Universalis Produzioni
      </div>
    </AbsoluteFill>
  );
};
