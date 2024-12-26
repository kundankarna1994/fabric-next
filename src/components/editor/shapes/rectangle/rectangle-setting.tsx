"use client";

import { Canvas, FabricObject } from "fabric";
import { ChangeEvent, useEffect, useState } from "react";

interface Props {
    selectedObj: FabricObject;
    canvas: Canvas;
}
const RectangleSetting = ({ selectedObj, canvas }: Props) => {
    console.log(selectedObj);
    const [width, setWidth] = useState<string | number>(
        Math.round(selectedObj.width * selectedObj.scaleX)
    );
    const [height, setHeight] = useState<string | number>(
        Math.round(selectedObj.height * selectedObj.scaleY)
    );

    const [strokeWidth, setStrokeWidth] = useState<string | number>(
        Math.round(selectedObj.strokeWidth)
    );

    const handleWidthChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value.replace(/,/g, ""), 10);

        if (isNaN(value) || value < 0) {
            setWidth("");
            return;
        }

        setWidth(value);

        selectedObj.set({ width: value / selectedObj.scaleX });
        canvas.renderAll();
    };

    const handleHeightChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value.replace(/,/g, ""), 10);
        if (isNaN(value) || value < 0) {
            setHeight("");
            return;
        }
        setHeight(value);
        if (value >= 0) {
            selectedObj.set({ height: value / selectedObj.scaleY });
            canvas.renderAll();
        }
    };

    const handleStrokeWidth = (e: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value.replace(/,/g, ""), 10);
        if (isNaN(value) || value < 0) {
            setStrokeWidth("");
            return;
        }
        setStrokeWidth(value);
        if (value > 0) {
            selectedObj.set({ strokeWidth: value });
            canvas.renderAll();
        }
    };

    useEffect(() => {
        canvas.on("object:modified", (e) => {
            setWidth(Math.round(e.target.width * e.target.scaleX));
            setHeight(Math.round(e.target.height * e.target.scaleY));
            setStrokeWidth(Math.round(e.target.strokeWidth));
        });
        canvas.on("object:scaling", (e) => {
            setWidth(Math.round(e.target.width * e.target.scaleX));
            setHeight(Math.round(e.target.height * e.target.scaleY));
            setStrokeWidth(Math.round(e.target.strokeWidth));
        });
    }, [canvas]);

    return (
        <div className="flex flex-col">
            <input value={width} onChange={handleWidthChange} />
            <input value={height} onChange={handleHeightChange} />
            <input value={strokeWidth} onChange={handleStrokeWidth} />
        </div>
    );
};

export default RectangleSetting;
