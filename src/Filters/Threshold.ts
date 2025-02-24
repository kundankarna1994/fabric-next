import {
    classRegistry,
    filters,
    T2DPipelineState,
    TWebGLAttributeLocationMap,
} from "fabric";

type ThresholdOwnProps = {
    threshold: number;
};

export const grayscaleDefaultValues: ThresholdOwnProps = {
    threshold: 100,
};

export class Threshold extends filters.BaseFilter<
    "Threshold",
    ThresholdOwnProps
> {
    static defaults = grayscaleDefaultValues;

    static uniformLocations = ["uMode"];

    applyTo2d({ imageData: { data } }: T2DPipelineState) {
        for (let i = 0, value: number; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
        }
    }

    getCacheKey() {
        return `_${this.type}`;
    }

    getFragmentSource() {
        return ``;
    }
    sendUniformData(
        gl: WebGLRenderingContext,
        uniformLocations: TWebGLAttributeLocationMap
    ) {
        const mode = 1;
        gl.uniform1i(uniformLocations.uMode, mode);
    }

    isNeutralState() {
        return false;
    }
}

classRegistry.setClass(Threshold);
