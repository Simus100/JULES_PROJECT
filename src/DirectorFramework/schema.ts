export type SceneType = 'title' | 'media' | 'split';
export type AnimationStyle = 'fade-up' | 'scale-in' | 'typewriter' | 'none';
export type TransitionType = 'fade' | 'slide-left' | 'slide-right' | 'slide-up' | 'slide-down' | 'none';

export interface BaseSceneData {
  id: string;
  type: SceneType;
  durationInFrames: number;
  transitionIn?: TransitionType;
}

export interface TitleSceneData extends BaseSceneData {
  type: 'title';
  title: string;
  subtitle?: string;
  textColor?: string;
  backgroundColor?: string;
  animationStyle?: AnimationStyle;
}

export interface MediaSceneData extends BaseSceneData {
  type: 'media';
  mediaUrl: string;
  mediaType: 'image' | 'video';
  overlayText?: string;
  overlayAnimation?: AnimationStyle;
}

export interface SplitSceneData extends BaseSceneData {
  type: 'split';
  leftText: string;
  rightMediaUrl: string;
  rightMediaType: 'image' | 'video';
  backgroundColor?: string;
}

export type SceneData = TitleSceneData | MediaSceneData | SplitSceneData;

export interface VideoScript {
  id: string;
  title: string;
  audioUrl?: string;
  audioVolume?: number;
  scenes: SceneData[];
}
