import { AbsoluteFill, Series, Audio, useVideoConfig } from "remotion";
import { Intro } from "./Intro";
import { CoreMessage } from "./CoreMessage";
import { Features } from "./Features";
import { AiFocus } from "./AiFocus";
import { Outro } from "./Outro";
import { staticFile } from "remotion";

export const AionNexusPromo = () => {
  const { width } = useVideoConfig();
  // Using width to force re-evaluation of responsive layout inside components if needed,
  // although they already use useVideoConfig internally.

  // Total duration: 1800 frames (60 seconds)
  // Adjusted pacing to make the internal events faster but stretch the holding times slightly
  // to maintain the 1 minute requirement while keeping the "action" fast.

  return (
    <AbsoluteFill className="bg-zinc-950 overflow-hidden">
      {/* Background Music */}
      <Audio src={staticFile("bgm.mp3")} volume={0.8} />

      <Series>
        {/* Intro Scene (Fast action, holds) - 10s */}
        <Series.Sequence durationInFrames={300}>
          <Intro />
        </Series.Sequence>

        {/* Core Message Scene - 15s */}
        <Series.Sequence durationInFrames={450}>
          <CoreMessage />
        </Series.Sequence>

        {/* Features Dashboard Scene - 15s */}
        <Series.Sequence durationInFrames={450}>
          <Features />
        </Series.Sequence>

        {/* AI Focus Scene - 10s */}
        <Series.Sequence durationInFrames={300}>
          <AiFocus />
        </Series.Sequence>

        {/* Outro CTA Scene - 10s */}
        <Series.Sequence durationInFrames={300}>
          <Outro />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
