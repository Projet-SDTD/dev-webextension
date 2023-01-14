import { useControlButtons } from "./buttons";
import { useHeadBox } from "./headBox";

import './main.css';

console.debug("CA MARCHE LES POTOS");
console.debug(document.URL);

setTimeout(() => {
  const { streamHeight, streamWidth, boxTransform, enabled } = useHeadBox();
  console.debug(boxTransform);

  const { isStarted } = useControlButtons(() => {
    console.debug("start");

    boxTransform.x = Math.random() * streamWidth.value;
    boxTransform.y = Math.random() * streamHeight.value;

    enabled.value = true;
  }, () => {
    console.debug("stop");
    enabled.value = false;
  });

  console.debug(isStarted);
}, 10000);
