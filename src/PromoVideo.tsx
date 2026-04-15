import React from "react";
import { Series, Audio } from "remotion";
import { IntroScene } from "./IntroScene";
import { ThreeScene } from "./ThreeScene";
import { GalleryScene } from "./GalleryScene";

import { staticFile } from "remotion";

export const PromoVideo: React.FC = () => {
  return (
    <>
      <Audio src={staticFile("audio.mp3")} volume={0.5} />
      <Series>
        <Series.Sequence durationInFrames={90}>
          <IntroScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={120}>
          <ThreeScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={150}>
          <GalleryScene />
        </Series.Sequence>
      </Series>
    </>
  );
};
