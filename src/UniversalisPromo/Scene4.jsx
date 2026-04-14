import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { noise2D } from "@remotion/noise";

const Stat = ({ number, text, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12 },
  });

  const progress = spring({
    frame: frame - delay - 10,
    fps,
    config: { damping: 50, mass: 1 },
  });

  const targetValue = parseInt(number);
  const numValue = Math.min(
    targetValue,
    Math.round(interpolate(progress, [0, 1], [0, targetValue]))
  );

  return (
    <div
      className="relative flex flex-col items-center justify-center p-12 bg-gradient-to-b from-gray-900/80 to-black/80 rounded-[3rem] border border-gray-700/50 backdrop-blur-md overflow-hidden"
      style={{
        transform: `scale(${scale})`,
        opacity: scale,
        boxShadow: `0 0 ${interpolate(scale, [0, 1], [0, 60])}px rgba(147, 51, 234, 0.3)`
      }}
    >
      {/* Dynamic glow behind text */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 blur-2xl" />

      <div className="z-10 text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-300 via-purple-400 to-pink-500 mb-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
        {number.includes("+") ? `${numValue}+` : number.includes("%") ? `${numValue}%` : numValue}
      </div>
      <div className="z-10 text-xl lg:text-2xl text-gray-200 font-bold uppercase tracking-[0.15em] text-center">{text}</div>
    </div>
  );
};

export const Scene4 = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill className="bg-black flex flex-col items-center justify-center p-12 overflow-hidden">
      {/* Background ambient noise */}
      <div
        className="absolute w-[150vw] h-[150vh] bg-gradient-to-br from-purple-900/30 to-blue-900/30 blur-[150px] mix-blend-screen"
        style={{
          transform: `rotate(${noise2D("seed1", frame * 0.005, 0) * 180}deg) scale(${1 + noise2D("seed2", frame * 0.01, 0) * 0.2})`
        }}
      />

      <div className="z-10 grid grid-cols-2 gap-12 lg:gap-16 w-full max-w-5xl mx-auto perspective-1000">
        <Stat number="10+" text="Progetti Completati" delay={30} />
        <Stat number="100%" text="Clienti Soddisfatti" delay={60} />
      </div>
    </AbsoluteFill>
  );
};
