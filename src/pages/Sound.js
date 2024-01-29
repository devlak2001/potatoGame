import { Howl } from "howler";
import { useEffect } from "react";

export const Sound = {
  potatoTapSound: new Howl({
    src: [
      "https://devlak2001.s3.eu-central-1.amazonaws.com/potatoPeeler/potatoTap.mp3",
    ],
    volume: 0,
  }),

  potatoCollectedSound: new Howl({
    src: [
      "https://devlak2001.s3.eu-central-1.amazonaws.com/potatoPeeler/collectedSound.mp3",
    ],
    volume: 0,
  }),

  gameBackgroundSound: new Howl({
    src: [
      "https://devlak2001.s3.eu-central-1.amazonaws.com/potatoPeeler/gameBackground.mp3",
    ],
    volume: 0,
    loop: true,
  }),
};

export const useSound = () => {
  useEffect(() => {
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        Object.keys(Sound).forEach((key) => {
          if (Sound[key].playing()) {
            Sound[key].pause();
          }
        });
      } else {
        Object.keys(Sound).forEach((key) => {
          if (Sound[key].seek() && !Sound[key].playing()) {
            Sound[key].play();
          }
        });
      }
    });

    window.addEventListener("blur", () => {
      Object.keys(Sound).forEach((key) => {
        if (Sound[key].playing()) {
          Sound[key].pause();
        }
      });
    });

    window.addEventListener("focus", () => {
      Object.keys(Sound).forEach((key) => {
        if (Sound[key].seek() && !Sound[key].playing()) {
          Sound[key].play();
        }
      });
    });
  }, []);
};
