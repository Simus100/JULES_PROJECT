import React from 'react';
import { AbsoluteFill, Audio, staticFile } from 'remotion';
import { TransitionSeries, springTiming } from '@remotion/transitions';
import { slide } from '@remotion/transitions/slide';
import { fade } from '@remotion/transitions/fade';
import { VideoScript, SceneData, TransitionType } from './schema';
import { TitleScene } from './scenes/TitleScene';
import { MediaScene } from './scenes/MediaScene';
import { SplitScene } from './scenes/SplitScene';
import { loadFont } from "@remotion/google-fonts/Montserrat";

loadFont();

const renderScene = (scene: SceneData) => {
  switch (scene.type) {
    case 'title':
      return <TitleScene data={scene} />;
    case 'media':
      return <MediaScene data={scene} />;
    case 'split':
      return <SplitScene data={scene} />;
    default:
      return null;
  }
};

const getTransition = (type: TransitionType) => {
  switch (type) {
    case 'fade':
      return fade();
    case 'slide-left':
      return slide({ direction: 'from-right' });
    case 'slide-right':
      return slide({ direction: 'from-left' });
    case 'slide-up':
      return slide({ direction: 'from-bottom' });
    case 'slide-down':
      return slide({ direction: 'from-top' });
    default:
      return null;
  }
};

export const DirectorComposition: React.FC<{ script: VideoScript }> = ({ script }) => {
  return (
    <AbsoluteFill className="bg-black text-white font-['Montserrat'] overflow-hidden">
      {script.audioUrl && (
        <Audio src={script.audioUrl.startsWith('http') ? script.audioUrl : staticFile(script.audioUrl)} volume={() => script.audioVolume ?? 1} />
      )}

      <TransitionSeries>
        {script.scenes.map((scene, index) => {
          const isFirstScene = index === 0;
          const transitionIn = scene.transitionIn && scene.transitionIn !== 'none' ? getTransition(scene.transitionIn) : null;

          const elements = [];

          if (!isFirstScene && transitionIn) {
            elements.push(
              <TransitionSeries.Transition
                key={`transition-${scene.id}`}
                presentation={transitionIn}
                timing={springTiming({ config: { damping: 14, mass: 0.8 }, durationInFrames: 20 })}
              />
            );
          }

          elements.push(
            <TransitionSeries.Sequence key={scene.id} durationInFrames={scene.durationInFrames}>
              {renderScene(scene)}
            </TransitionSeries.Sequence>
          );

          return elements;
        })}
      </TransitionSeries>
    </AbsoluteFill>
  );
};
