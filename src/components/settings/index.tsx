"use client";

import { Canvas, Circle, FabricObject, Rect } from "fabric";
import shapes, { settings } from "../editor/configs/shapes";
import { useCallback, useEffect, useState } from "react";

interface Props {
    canvas: Canvas;
}

const RenderSetting = ({
    selectedObject,
    canvas,
}: {
    selectedObject: FabricObject;
    canvas: Canvas;
}) => {
    const Setting = settings[selectedObject.type];
    return <Setting selectedObj={selectedObject} canvas={canvas} />;
};
const Settings = ({ canvas }: Props) => {
    const [selectedObject, setSelectedObject] = useState<FabricObject | null>();

    useEffect(() => {
        canvas.on("selection:created", (e) => {
            setSelectedObject(e.selected[0]);
        });
        canvas.on("selection:updated", (e) => {
            setSelectedObject(e.selected[0]);
        });
        canvas.on("selection:cleared", (e) => {
            setSelectedObject(null);
        });
    }, [canvas]);

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            const isDeleteCombo =
                (e.key === "Backspace" || e.key === "Delete") && e.shiftKey;

            if (isDeleteCombo && selectedObject) {
                canvas.remove(selectedObject);
                canvas.discardActiveObject();
                canvas.renderAll();
                setSelectedObject(null);
            }
        };

        document.addEventListener("keydown", handleKeyPress);

        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [canvas, selectedObject]);

    return (
        <div className="p-4 flex flex-col items-start">
            {selectedObject && settings[selectedObject.type] && (
                <div key={selectedObject.id}>
                    <RenderSetting
                        selectedObject={selectedObject}
                        canvas={canvas}
                    />
                </div>
            )}
        </div>
    );
};

export default Settings;
