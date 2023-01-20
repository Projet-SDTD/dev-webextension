import { logError } from "./log";

const BASE_URL = "https://phase1.sdtd.marche.ovh";

export const isOnline = async () => {
  const url = BASE_URL + "/ping";

  try {
    const res = await fetch(url);
    return res.ok;
  } catch (e) {
    logError(e);
    return false;
  }
};

export const startStream = async () => {
  const url = BASE_URL + "/start";

  const data = new FormData();
  data.append("URL", document.URL);
  data.append("QUALITY", "720p60");
  data.append("FPS", "4");

  return await fetch(url, {
    method: "POST",
    body: data,
  });
};

export const stopStream = async () => {
  const url = BASE_URL + "/stop";

  const data = new FormData();
  data.append("URL", document.URL);

  return await fetch(url, {
    method: "POST",
    body: data,
  });
};

// TODO
// interface FaceData {
//   i_dont_know_yet: unknown;
// }

export const getFaceData = async () => {
  const url = BASE_URL + "/dbtt";

  const data = new FormData();
  data.append("URL", document.URL);

  const res = await fetch(url, {
    method: "POST",
    body: data,
  });

  await res.json();
};
