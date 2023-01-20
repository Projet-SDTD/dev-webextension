import { isButtonContainerAvailable, useControlButtons } from "./buttons";
import { useHeadBox } from "./headBox";
import { log } from "./log";

import './main.css';

log("Extension loaded");

const autoStartHandler = () => {
  if (!isButtonContainerAvailable()) {
    // Retry next frame
    log("no container, retry next frame");
    requestAnimationFrame(autoStartHandler);
  } else {
    // Start extension next frame (for no particular reason)
    log("YAY START EXT");
    requestAnimationFrame(startExt);
  }
};

const startExt = () => {
  const { streamHeight, streamWidth, boxTransform, enabled } = useHeadBox();
  log("BOX POS:", boxTransform);

  const { isStarted, isEnabled } = useControlButtons(() => {
    log("btn start");

    boxTransform.x = Math.random() * streamWidth.value;
    boxTransform.y = Math.random() * streamHeight.value;

    enabled.value = true;
  }, () => {
    log("btn stop");
    enabled.value = false;
  });

  isEnabled.value = false;

  log(isStarted);
}

// Wait for the UI to load, but this time, I have a brain
requestAnimationFrame(autoStartHandler);
