import { browser } from "webextension-polyfill-ts";
import { getFaceData, startStream, stopStream } from "./api";
import { SdtdMessage, SdtdMessageType } from "./messages";

browser.runtime.onStartup.addListener(() => {
  console.log("uwu");
});

browser.runtime.onMessage.addListener(async (message: SdtdMessage) => {
  switch (message.type) {
    case SdtdMessageType.START:
      await startStream(message.url);
      return;
    case SdtdMessageType.STOP:
      await stopStream(message.url);
      return;
    case SdtdMessageType.GET_DATA:
      return getFaceData(message.url);
  }
});
