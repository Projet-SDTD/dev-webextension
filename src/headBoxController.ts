import { BoxTransform, useHeadBox } from "./headBox";

export const useHeadBoxController = () => {
    const headBoxCache = [];

    const setMultipleBoxTransform = (transforms: BoxTransform[]) => {
        for (let i = headBoxCache.length; i < headBoxCache.length; i++) {
            headBoxCache.push(useHeadBox());
        }
        // TODO
        void transforms;
    }

    return { setMultipleBoxTransform };
};