import { interpolate, useCurrentFrame, AbsoluteFill } from "remotion";

export const PulsingGraphic = () => {
  const frame = useCurrentFrame();

  // Pulsing effect using Math.sin
  const pulse = Math.sin(frame / 10) * 0.1 + 1; // Pulses between 0.9 and 1.1

  const opacity = interpolate(frame, [0, 30], [0, 0.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="justify-center items-center">
      <div
        className="rounded-full border border-blue-500 shadow-[0_0_50px_rgba(0,150,255,0.5)]"
        style={{
          width: 600,
          height: 600,
          opacity,
          transform: `scale(${pulse})`,
          background: "radial-gradient(circle, rgba(0,150,255,0.1), transparent)",
        }}
      >
        {/* Inner circle */}
        <div
          className="rounded-full border border-blue-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ width: 400, height: 400 }}
        />
        {/* Innermost circle */}
        <div
          className="rounded-full border border-blue-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ width: 200, height: 200 }}
        />
      </div>
    </AbsoluteFill>
  );
};
