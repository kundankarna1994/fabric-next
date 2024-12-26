"use client";

import { Canvas } from "fabric";
import shapes from "../configs/shapes";

interface Props {
    canvas: Canvas;
}

const Tools = ({ canvas }: Props) => {
    return (
        <div className="p-4 flex flex-col items-start">
            {shapes.map((shape) => (
                <shape.elem
                    name={shape.key}
                    key={shape.name}
                    obj={shape.shape}
                    canvas={canvas}
                />
            ))}
        </div>
    );
};

export default Tools;
