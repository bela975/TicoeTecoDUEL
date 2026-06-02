import ticoHappy from "./img/ticoHappyteco-removebg-preview.png";
import ticoHungry from "./img/ticoHungry-removebg-preview.png";
import ticoIdle from "./img/ticoIdle-removebg-preview.png";
import ticoDead from "./img/ticoMorto-removebg-preview.png";
import ticoSleepy from "./img/ticoSleepy-removebg-preview.png";

import tecoDirty from "./img/Filthyteco-removebg-preview.png";
import tecoSleepy from "./img/sleepyteco-removebg-preview.png";
import tecoIdle from "./img/teco-removebg-preview.png";
import tecoDead from "./img/tecoMorto-removebg-preview.png";
import tecoHappy from "./img/tecoSmile-removebg-preview.png";

import food from "./img/food-removebg-preview.png";
import bath from "./img/bath-removebg-preview.png";
import heart from "./img/heart-removebg-preview.png";
import zzz from "./img/zzz-removebg-preview.png";

export const effectImages = { feed: food, bath, play: heart, sleep: zzz };

export function getPetImage(baseName, visualState) {
  if (baseName === "tico") {
    if (visualState === "happy") return ticoHappy;
    if (visualState === "dirty") return ticoDead;
    if (visualState === "hungry") return ticoHungry;
    if (visualState === "sleepy") return ticoSleepy;
    if (visualState === "deadline") return ticoDead;
    return ticoIdle;
  }

  if (visualState === "happy") return tecoHappy;
  if (visualState === "dirty") return tecoDirty;
  if (visualState === "hungry") return tecoIdle;
  if (visualState === "sleepy") return tecoSleepy;
  if (visualState === "deadline") return tecoDead;
  return tecoIdle;
}
