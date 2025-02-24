import Circle from "../shapes/circle/circle";
import { Circle as FCircle, Rect as FRect, FabricImage, filters } from "fabric";
import CircleSetting from "../shapes/circle/circle-setting";
import Rectangle from "../shapes/rectangle/rectangle";
import RectangleSetting from "../shapes/rectangle/rectangle-setting";
import { v4 as uuid } from "uuid";
import ImageSetting from "../shapes/image/image-setting";
import Image from "../shapes/image/image";
import { SwapColor } from "@/Filters/SwapColor";
import { ThresholdBlack } from "@/Filters/Threshold";

const shapes = [
    {
        name: "Rectangle",
        elem: Rectangle,
        setting: RectangleSetting,
        key: "rect",
        shape: new FRect({
            width: 100,
            height: 100,
            fill: "transparent",
            stroke: "black",
            strokeUniform: true,
            borderScaleFactor: 0,
            id: uuid(),
        }),
    },
    {
        name: "Circle",
        elem: Circle,
        setting: CircleSetting,
        key: "circle",
        shape: new FCircle({
            radius: 100,
            fill: "transparent",
            stroke: "black",
            id: uuid(),
        }),
    },
];

FabricImage.fromURL(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtnvAOajH9gS4C30cRF7rD_voaTAKly2Ntaw&s",
    {
        crossOrigin: "anonymous",
    }
).then((img) => {
    const threshold = new ThresholdBlack();
    threshold.threshold = 1;
    img.filters = [new filters.BlackWhite(), threshold];
    img.applyFilters();
    img.set({
        dirty: true,
        scaleX: 0.5,
        scaleY: 0.5,
        left: 100,
        top: 100,
        angle: -15,
    });

    shapes.push({
        name: "Image",
        elem: Image,
        setting: ImageSetting,
        key: "image",
        shape: img,
    });
});

export const settings = shapes.reduce((acc, cur) => {
    acc[cur.key] = cur.setting;
    return acc;
}, {} as Record<string, typeof RectangleSetting | typeof CircleSetting>);

export default shapes;
