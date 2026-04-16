import "./index.css";
import { Composition } from "remotion";
import { PromoVideo } from "./PromoVideo";
import { UniversalisPromo } from "./UniversalisPromo/index";
import { DirectorComposition } from "./DirectorFramework/DirectorComposition";
import { VideoScript } from "./DirectorFramework/schema";
import exampleScriptData from "./DirectorFramework/exampleScript.json";
import trumpScriptData from "./DirectorFramework/trumpScript.json";

const exampleScript = exampleScriptData as VideoScript;
const trumpScript = trumpScriptData as VideoScript;

const calculateTotalDuration = (script: VideoScript) => {
  return script.scenes.reduce((acc, scene) => acc + scene.durationInFrames, 0);
};

export const RemotionRoot: React.FC = () => {
  const durationInFrames = calculateTotalDuration(exampleScript) || 300;

  return (
    <>
      <Composition
        id="PromoVideo"
        component={PromoVideo}
        durationInFrames={360}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="UniversalisPromo"
        component={UniversalisPromo}
        durationInFrames={1155}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Director Framework Compositions */}
      <Composition
        id="DirectorHorizontal"
        component={DirectorComposition}
        durationInFrames={durationInFrames}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ script: exampleScript }}
      />
      <Composition
        id="DirectorVertical"
        component={DirectorComposition}
        durationInFrames={durationInFrames}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ script: exampleScript }}
      />
      <Composition
        id="DirectorSquare"
        component={DirectorComposition}
        durationInFrames={durationInFrames}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{ script: exampleScript }}
      />

      <Composition
        id="TrumpVideo"
        component={DirectorComposition}
        durationInFrames={calculateTotalDuration(trumpScript)}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ script: trumpScript }}
      />
    </>
  );
};
