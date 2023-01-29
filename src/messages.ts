export enum SdtdMessageType {
    START,
    STOP,
    GET_DATA,
}

export interface SdtdMessageStart {
    type: SdtdMessageType.START,
    url: string,
}

export interface SdtdMessageStop {
    type: SdtdMessageType.STOP,
    url: string,
}

export interface SdtdMessageGetData {
    type: SdtdMessageType.GET_DATA,
    url: string,
}

export interface SdtdMessageGetDataResponse {
    x: number,
    y: number,
    width: number,
    height: number,
    emotion: string,
}

export type SdtdMessage = SdtdMessageStart | SdtdMessageStop | SdtdMessageGetData;
