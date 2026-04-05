import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { useMemo, useId } from "react";

export const DynamicBackground = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const patternId = useId();

  // Create moving lines
  const offset = (frame * 2) % 100;
  const gridOffset = `-${offset}px`;

  // Abstract noise simulation via SVG
  const svgFilter = useMemo(() => {
    return (
      <svg width="0" height="0">
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
          <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.1 0" />
        </filter>
      </svg>
    );
  }, []);

  return (
    <AbsoluteFill className="bg-zinc-950 overflow-hidden">
      {svgFilter}

      {/* Dynamic Grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
          transform: `translate(${gridOffset}, ${gridOffset})`,
          width: width + 200,
          height: height + 200,
        }}
      />

      {/* Noise layer */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
        style={{ filter: "url(#noise)" }}
      />

      {/* Pulsing glow */}
      <div
        className="absolute inset-0 opacity-40 mix-blend-screen"
        style={{
          background: `radial-gradient(circle at 50% ${50 + Math.sin(frame / 20) * 10}%, rgba(37,99,235,0.2) 0%, transparent 60%)`
        }}
      />

      {/* Abstract geometric shapes moving slowly */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] border border-blue-500/20 rounded-full mix-blend-screen"
           style={{ transform: `scale(${1 + Math.sin(frame/40)*0.1}) translate(${Math.cos(frame/50)*50}px)`}} />
      <div className="absolute bottom-1/4 right-1/4 w-[800px] h-[800px] border-2 border-cyan-500/10 rounded-full mix-blend-screen"
           style={{ transform: `scale(${1 + Math.cos(frame/30)*0.1}) translate(${-Math.sin(frame/60)*50}px)`}} />
    </AbsoluteFill>
  );
};
