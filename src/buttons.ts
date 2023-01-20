import { watchEffect } from "@vue-reactivity/watch";
import { ref } from "@vue/reactivity";

export type StartStopHandler = () => void | null;

const SELECTOR_CONTAINER = "[data-target='channel-header-right']";
const SELECTOR_UI_LOADED = `${SELECTOR_CONTAINER} [data-a-target='follow-button']`

const BTN_START_TEXT = "Show Emotion";
const BTN_STOP_TEXT = "Hide Emotion";
const BTN_UNAVAIL_TEXT = "Unvailable";

export const isButtonContainerAvailable = () => {
  let needsToBeLoaded = document.querySelector(SELECTOR_UI_LOADED);
  return needsToBeLoaded != null;
}

export const useControlButtons = (startHandler: StartStopHandler, stopHandler: StartStopHandler) => {
  // Setup DOM
  const channelButtonContainerEl = document.querySelector(SELECTOR_CONTAINER)!;
  const btnToggleEnable = document.createElement("button");
  btnToggleEnable.classList.add("ptsd-btn-start");
  btnToggleEnable.innerText = BTN_START_TEXT;
  channelButtonContainerEl.prepend(btnToggleEnable);

  // Button state
  const isStarted = ref(false);
  const isEnabled = ref(false);

  watchEffect(() => {
    if (!isEnabled.value) {
      btnToggleEnable.innerText = BTN_UNAVAIL_TEXT;
      btnToggleEnable.disabled = true;
    } else {
      btnToggleEnable.disabled = false;

      if (isStarted.value) {
        btnToggleEnable.innerText = BTN_STOP_TEXT;
      } else {
        btnToggleEnable.innerText = BTN_START_TEXT;
      }
    }
  });

  btnToggleEnable.addEventListener("click", () => {
    if (isStarted.value) {
      stopHandler();
    } else {
      startHandler();
    }

    isStarted.value = !isStarted.value;
  });

  return { isStarted, isEnabled };
};
