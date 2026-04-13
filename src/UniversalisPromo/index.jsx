import { AbsoluteFill, Series, Audio, staticFile } from "remotion";
import { Scene1 } from "./Scene1";
import { Scene2 } from "./Scene2";
import { Scene3 } from "./Scene3";
import { Scene4 } from "./Scene4";
import { Scene5 } from "./Scene5";
import { loadFont } from "@remotion/google-fonts/Montserrat";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { fade } from "@remotion/transitions/fade";

loadFont();

export const UniversalisPromo = () => {
  return (
    <AbsoluteFill className="bg-black text-white font-['Montserrat'] overflow-hidden">
      <Audio src={staticFile("audio.mp3")} volume={0.8} />

      <TransitionSeries>
        {/* Scene 1: Epic Intro - 8 seconds (240 frames), aligned with an 8-bar musical intro */}
        <TransitionSeries.Sequence durationInFrames={240}>
          <Scene1 />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={springTiming({ config: { damping: 12, mass: 0.5 }, durationInFrames: 15 })}
        />

        {/* Scene 2: Services Showcase - ~7.5 seconds (225 frames), drops on the beat */}
        <TransitionSeries.Sequence durationInFrames={225}>
          <Scene2 />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={springTiming({ config: { damping: 14, mass: 0.8 }, durationInFrames: 20 })}
        />

        {/* Scene 3: The Process - ~7.5 seconds (225 frames) */}
        <TransitionSeries.Sequence durationInFrames={225}>
          <Scene3 />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={springTiming({ config: { damping: 14, mass: 0.8 }, durationInFrames: 20 })}
        />

        {/* Scene 4: "Why Choose Us?" - ~7.5 seconds (225 frames) */}
        <TransitionSeries.Sequence durationInFrames={225}>
          <Scene4 />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={springTiming({ config: { damping: 12, mass: 0.5 }, durationInFrames: 15 })}
        />

        {/* Scene 5: Outro/CTA - 8 seconds (240 frames), fading out */}
        <TransitionSeries.Sequence durationInFrames={240}>
          <Scene5 />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
