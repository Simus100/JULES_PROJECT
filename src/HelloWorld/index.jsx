import {
  AbsoluteFill,
  Sequence,
  Audio,
  staticFile,
} from "remotion";
import { Title } from "./Title";
import { Subtitle } from "./Subtitle";
import { PulsingGraphic } from "./PulsingGraphic";
import { FinalScene } from "./FinalScene";

export const HelloWorld = ({ titleText, titleColor }) => {
  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(circle, #1a2a6c, #112240, #0a192f)",
      }}
    >
      <Audio src={staticFile("thx_intro.wav")} />

      {/* Background Graphic Element */}
      <Sequence from={0} durationInFrames={200}>
        <PulsingGraphic />
      </Sequence>

      {/* Title with spring animation */}
      <Sequence from={10} durationInFrames={190}>
        <Title titleText={titleText} titleColor={titleColor} />
      </Sequence>

      {/* Subtitle enters 20 frames after Title (10 + 20 = 30) */}
      <Sequence from={30} durationInFrames={170}>
        <Subtitle />
      </Sequence>

      {/* Final scene scaling up the URL */}
      <Sequence from={180}>
        <FinalScene />
      </Sequence>
    </AbsoluteFill>
  );
};
