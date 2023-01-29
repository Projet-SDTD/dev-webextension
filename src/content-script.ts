import { browser } from "webextension-polyfill-ts";
import { isButtonContainerAvailable, useControlButtons } from "./buttons";
import { useHeadBox } from "./headBox";
import { log } from "./log";
import { SdtdMessage, SdtdMessageGetDataResponse, SdtdMessageType } from "./messages";

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
  const { streamHeight, streamWidth, boxTransform, emotionText, enabled } = useHeadBox();
  log("BOX POS:", boxTransform);

  streamHeight.value = 720;
  streamWidth.value = 1280;

  let getDataIntervalId = null as NodeJS.Timer | null;

  const getDataAtInterval = async () => {
    const data = await browser.runtime.sendMessage({
      type: SdtdMessageType.GET_DATA,
      url: window.location.toString(),
    } as SdtdMessage) as SdtdMessageGetDataResponse;

    console.log(data);

    boxTransform.width = data.width;
    boxTransform.height = data.height;
    boxTransform.x = data.x;
    boxTransform.y = data.y;
    emotionText.value = data.emotion;
  };

  const { isStarted, isEnabled } = useControlButtons(() => {
    log("btn start");

    browser.runtime.sendMessage({
      type: SdtdMessageType.START,
      url: window.location.toString(),
    } as SdtdMessage);

    getDataIntervalId = setInterval(getDataAtInterval, 2000);

    enabled.value = true;
  }, () => {
    log("btn stop");

    browser.runtime.sendMessage({
      type: SdtdMessageType.STOP,
      url: window.location.toString(),
    } as SdtdMessage);

    if (getDataIntervalId !== null) {
      clearInterval(getDataIntervalId);
    }

    enabled.value = false;
  });

  isEnabled.value = true;

  log(isStarted);
}

// Wait for the UI to load, but this time, I have a brain
requestAnimationFrame(autoStartHandler);
