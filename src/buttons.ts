import { watchEffect } from "@vue-reactivity/watch";
import { ref } from "@vue/reactivity";

export type StartStopHandler = () => void | null;

export const useControlButtons = (startHandler: StartStopHandler, stopHandler: StartStopHandler) => {
  // Setup DOM
  const channelButtonContainerEl = document.querySelector("[data-target='channel-header-right']")!;
  const btnStart = document.createElement("button");
  btnStart.classList.add("ptsd-btn-start", "fJqVYS", "eVWnXL");
  btnStart.innerText = "PTSD START";
  channelButtonContainerEl.prepend(btnStart);

  // Reactive data
  const isStarted = ref(false);

  watchEffect(() => {
    if (isStarted.value) {
      btnStart.innerText = "PTSD STOP";
    } else {
      btnStart.innerText = "PTSD START";
    }
  });

  btnStart.addEventListener("click", () => {
    if (isStarted.value) {
      stopHandler();
    } else {
      startHandler();
    }

    isStarted.value = !isStarted.value;
  });

  return { isStarted };
};
