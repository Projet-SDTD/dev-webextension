import { reactive, ref } from "@vue/reactivity";
import { watchEffect } from "@vue-reactivity/watch";

export const useBox = () => {
  // Real stream size used by the server data
  const streamWidth = ref(1920);
  const streamHeight = ref(1080);

  // Real box transform according to server
  const boxTransform = reactive({
    width: 200,
    height: 200,
    x: 1920 / 2,
    y: 1080 / 2,
  });

  // Setup DOM
  const containerEl = ref(document.getElementsByClassName("channel-root__player")[0]);
  const boxEl = ref(document.createElement("box"));
  boxEl.value.classList.add("ptsd-box");
  containerEl.value.append(boxEl.value);

  // Box transform for display (in a function because containerEl dimensions are not reactive)
  const computeDisplayTransform = () => {
    const factor = containerEl.value.clientWidth / streamWidth.value;
    return {
      width: boxTransform.width * factor,
      height: boxTransform.height * factor,
      x: boxTransform.x * factor,
      y: boxTransform.y * factor,
    };
  };

  const updateBoxTransform = () => {
    const boxDisplayTransform = computeDisplayTransform();
    boxEl.value.style.width = `${boxDisplayTransform.width}px`;
    boxEl.value.style.height = `${boxDisplayTransform.height}px`;
    boxEl.value.style.left = `${boxDisplayTransform.x}px`;
    boxEl.value.style.top = `${boxDisplayTransform.y}px`;
    console.debug("raw data:", JSON.parse(JSON.stringify(boxTransform)));
    console.debug("SET BOX TRANSFORM ON", boxEl.value);
  }

  // Apply display values to box element reactively
  watchEffect(() => {
    updateBoxTransform();
  });
  const resizeObserver = new ResizeObserver(() => {
    console.debug("resized");
    updateBoxTransform();
  });
  resizeObserver.observe(containerEl.value);

  return {
    boxEl,
    streamHeight,
    streamWidth,
    boxTransform
  };
};