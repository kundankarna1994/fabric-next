import Circle from "../shapes/circle/circle";
import { Circle as FCircle, Rect as FRect } from "fabric";
import CircleSetting from "../shapes/circle/circle-setting";
import Rectangle from "../shapes/rectangle/rectangle";
import RectangleSetting from "../shapes/rectangle/rectangle-setting";
import { v4 as uuid } from "uuid";

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

export const settings = shapes.reduce((acc, cur) => {
    acc[cur.key] = cur.setting;
    return acc;
}, {} as Record<string, typeof RectangleSetting | typeof CircleSetting>);

export default shapes;
