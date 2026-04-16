import React from 'react';
import { AbsoluteFill, Img, Video } from 'remotion';
import { SplitSceneData } from '../schema';
import { AnimatedText } from '../components/AnimatedText';

export const SplitScene: React.FC<{ data: SplitSceneData }> = ({ data }) => {
  const {
    leftText,
    rightMediaUrl,
    rightMediaType,
    backgroundColor = 'black',
  } = data;

  return (
    <AbsoluteFill className="flex flex-row" style={{ backgroundColor }}>
      <div className="w-1/2 h-full flex flex-col items-center justify-center p-12">
        <AnimatedText
          text={leftText}
          animationStyle="fade-up"
          className="text-5xl font-bold text-white leading-tight"
        />
      </div>
      <div className="w-1/2 h-full">
        {rightMediaType === 'image' ? (
          <Img src={rightMediaUrl} className="w-full h-full" style={{ objectFit: 'cover' }} />
        ) : (
          <Video src={rightMediaUrl} className="w-full h-full" style={{ objectFit: 'cover' }} loop muted />
        )}
      </div>
    </AbsoluteFill>
  );
};
