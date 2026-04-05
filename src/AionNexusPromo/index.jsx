import { AbsoluteFill, Series, Audio } from "remotion";
import { Intro } from "./Intro";
import { CoreMessage } from "./CoreMessage";
import { Features } from "./Features";
import { AiFocus } from "./AiFocus";
import { Outro } from "./Outro";
import { staticFile } from "remotion";

export const AionNexusPromo = () => {
  return (
    <AbsoluteFill className="bg-zinc-950">
      {/* Background Music */}
      <Audio src={staticFile("bgm.mp3")} volume={0.6} />

      <Series>
        {/* Intro Scene (10s) */}
        <Series.Sequence durationInFrames={300}>
          <Intro />
        </Series.Sequence>

        {/* Core Message Scene (15s) */}
        <Series.Sequence durationInFrames={450}>
          <CoreMessage />
        </Series.Sequence>

        {/* Features Dashboard Scene (15s) */}
        <Series.Sequence durationInFrames={450}>
          <Features />
        </Series.Sequence>

        {/* AI Focus Scene (10s) */}
        <Series.Sequence durationInFrames={300}>
          <AiFocus />
        </Series.Sequence>

        {/* Outro CTA Scene (10s) */}
        <Series.Sequence durationInFrames={300}>
          <Outro />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
