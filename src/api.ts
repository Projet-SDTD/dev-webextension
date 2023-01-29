import { logError } from "./log";
import { SdtdMessageGetDataResponse } from "./messages";

const BASE_URL = "https://phase1.sdtd.marche.ovh";
// const BASE_URL = "http://34.163.1.221/";

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

export const startStream = async (streamUrl: string) => {
  const url = BASE_URL + "/start";

  const data = new FormData();
  data.append("URL", streamUrl);
  data.append("QUALITY", "720p60");
  data.append("FPS", "4");

  return await fetch(url, {
    method: "POST",
    body: data,
  });
};

export const stopStream = async (streamUrl: string) => {
  const url = BASE_URL + "/stop";

  const data = new FormData();
  data.append("URL", streamUrl);

  return await fetch(url, {
    method: "POST",
    body: data,
  });
};

interface FaceData {
  FrameId: number,
  FaceId: number,
  X: number,
  Y: number,
  Width: number,
  Height: number,
  TimestampFrame: string,
  MainEmotion: number,
  Url: string,
}

enum Emotion {
  NEUTRAL = 0,
  HAPPINESS = 1,
  SURPRISE = 2,
  SADNESS = 3,
  ANGER = 4,
  DISGUST = 5,
  FEAR = 6,
  CONTEMPT = 7,
}

type FacesData = Array<FaceData>;

const emotionIdToString = (emotion: Emotion) => {
  switch (emotion) {
    case Emotion.NEUTRAL:
      return "Neutre";
    case Emotion.HAPPINESS:
      return "Content";
    case Emotion.SURPRISE:
      return "Surpris";
    case Emotion.SADNESS:
      return "Tristounet";
    case Emotion.ANGER:
      return "Pas content";
    case Emotion.DISGUST:
      return "Dégouté quoi";
    case Emotion.FEAR:
      return "Peur";
    case Emotion.CONTEMPT:
      return "Mépris";
  }
}

export const getFaceData = async (streamUrl: string) => {
  const url = BASE_URL + "/dbtt";

  const data = new FormData();
  data.append("URL", streamUrl);

  const res = await fetch(url, {
    method: "POST",
    body: data,
  });

  const faces = (await res.json()) as FacesData;

  console.log(JSON.stringify(faces[0]));

  return {
    emotion: emotionIdToString(faces[0].MainEmotion),
    width: faces[0].Width,
    height: faces[0].Height,
    x: faces[0].X,
    y: faces[0].Y,
  } as SdtdMessageGetDataResponse;
};
