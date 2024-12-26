"use client";

import { Canvas, Circle, FabricObject } from "fabric";
import { ChangeEvent, useEffect, useState } from "react";

interface Props {
    selectedObj: FabricObject;
    canvas: Canvas;
}
const CircleSetting = ({ selectedObj, canvas }: Props) => {
    const [diameter, setDiameter] = useState<string | number>(
        Math.round(selectedObj.radius * 2 * selectedObj.scaleX)
    );

    const handleRadiusChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value.replace(/,/g, ""), 10);

        if (isNaN(value) || value < 0) {
            setDiameter("");
            return;
        }

        setDiameter(value);

        selectedObj.set({ radius: value / 2 / selectedObj.scaleX });
        canvas.renderAll();
    };

    useEffect(() => {
        canvas.on("object:modified", (e: { target: Circle }) => {
            setDiameter(Math.round(e.target.radius * 2 * e.target.scaleX));
        });
    }, [canvas]);

    return (
        <div className="flex flex-col">
            <input value={diameter} onChange={handleRadiusChange} />
        </div>
    );
};

export default CircleSetting;
