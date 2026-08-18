import "./index.css";
import { Composition } from "remotion";
import { PromoClub } from "./PromoClub";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="PromoTaekwondo"
        component={PromoClub}
        durationInFrames={450} // 15 seconds at 30 fps
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
