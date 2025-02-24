import {
    filters,
    type T2DPipelineState,
    TWebGLAttributeLocationMap,
} from "fabric";

/**
 * Fragment source for the ThresholdBlack filter
 */
const fragmentSource = `
 precision highp float;
 uniform sampler2D uTexture;
 uniform float uThreshold;
 varying vec2 vTexCoord;
 void main() {
   vec4 color = texture2D(uTexture, vTexCoord);
   float brightness = (color.r + color.g + color.b) / 3.0;
   gl_FragColor = brightness < uThreshold ? vec4(0.0, 0.0, 0.0, color.a) : color;
 }`;

/**
 * ThresholdBlack filter class
 */
export class ThresholdBlack extends filters.BaseFilter<
    "ThresholdBlack",
    { threshold: number }
> {
    static type = "ThresholdBlack";

    static defaults = {
        threshold: 0.5, // Default threshold (0 to 1)
    };

    declare threshold: number;

    static uniformLocations = ["uThreshold"];

    protected getFragmentSource(): string {
        return fragmentSource;
    }

    /**
     * Apply the threshold operation to a Uint8ClampedArray representing the pixels of an image.
     */
    applyTo2d({ imageData: { data } }: T2DPipelineState) {
        const threshold = this.threshold * 255;
        for (let i = 0; i < data.length; i += 4) {
            const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
            if (brightness < threshold) {
                data[i] = 0;
                data[i + 1] = 0;
                data[i + 2] = 0;
            }
        }
    }

    /**
     * Send data from this filter to its shader program's uniforms.
     */
    sendUniformData(
        gl: WebGLRenderingContext,
        uniformLocations: TWebGLAttributeLocationMap
    ) {
        gl.uniform1f(uniformLocations.uThreshold, this.threshold);
    }

    isNeutralState(): boolean {
        return this.threshold === 0;
    }
}
