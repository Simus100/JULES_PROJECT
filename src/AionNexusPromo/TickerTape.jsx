import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { useMemo } from "react";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont();

export const TickerTape = () => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();

  // Create a continuous scrolling effect
  const offset = (frame * 5) % (width * 2);

  const style = useMemo(() => {
    return { fontFamily };
  }, [fontFamily]);

  const text = "AION NEXUS • AUTOMATION INTELLIGENCE • LIVE FEED • METRICHE • FOCUS • AI BRIEF • ";
  // Repeat enough to fill screens and loop
  const content = text.repeat(10);

  return (
    <AbsoluteFill className="pointer-events-none z-0 overflow-hidden" style={style}>
      {/* Top Ticker - Scrolls left */}
      <div
        className="absolute top-10 whitespace-nowrap text-zinc-800/20 font-black tracking-widest uppercase opacity-40 mix-blend-overlay"
        style={{
          fontSize: width > 1200 ? '120px' : '80px',
          transform: `translateX(-${offset}px)`
        }}
      >
        {content}
      </div>

      {/* Bottom Ticker - Scrolls right */}
      <div
        className="absolute bottom-10 whitespace-nowrap text-blue-900/10 font-black tracking-widest uppercase opacity-30 mix-blend-overlay"
        style={{
          fontSize: width > 1200 ? '120px' : '80px',
          transform: `translateX(-${(width*2) - offset}px)`
        }}
      >
        {content}
      </div>

      {/* Center Background massive text */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <div
          className="text-[400px] font-black text-white leading-none mix-blend-overlay"
          style={{ transform: `scale(${1 + Math.sin(frame/50)*0.05})` }}
        >
          AI
        </div>
      </div>
    </AbsoluteFill>
  );
};
