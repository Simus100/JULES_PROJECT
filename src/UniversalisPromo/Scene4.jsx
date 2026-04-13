import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

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
    config: { damping: 200, mass: 2 },
  });

  const targetValue = parseInt(number);
  const numValue = Math.floor(interpolate(progress, [0, 1], [0, targetValue]));

  return (
    <div
      className="flex flex-col items-center justify-center p-12 bg-gradient-to-b from-gray-900 to-black rounded-3xl border border-gray-800"
      style={{
        transform: `scale(${scale})`,
        opacity: scale
      }}
    >
      <div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-purple-500 mb-4">
        {number.includes("+") ? `${numValue}+` : number.includes("%") ? `${numValue}%` : numValue}
      </div>
      <div className="text-2xl text-gray-300 font-medium uppercase tracking-wider text-center">{text}</div>
    </div>
  );
};

export const Scene4 = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill className="bg-black flex flex-col items-center justify-center p-24">
      <div className="grid grid-cols-2 gap-16 w-full max-w-6xl mx-auto">
        <Stat number="10+" text="Progetti Completati" delay={30} />
        <Stat number="100%" text="Clienti Soddisfatti" delay={60} />
      </div>
    </AbsoluteFill>
  );
};
