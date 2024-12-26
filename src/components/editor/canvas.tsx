"use client";

import { Canvas, FabricObject, Point, util } from "fabric";
import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { useDrop } from "react-dnd";
import Tools from "./tools";
import Settings from "../settings";

interface CanvasProps {
    width: number;
    height: number;
}

const CanvasComponent = ({ width, height }: CanvasProps) => {
    const [canvas, setCanvas] = useState<Canvas | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const canvasInstanceRef = useRef<Canvas | null>(null);
    const [zoomLevel, setZoomLevel] = useState(1);

    useEffect(() => {
        if (canvasRef.current) {
            const initializeCanvas = new Canvas(canvasRef.current, {
                width: width,
                height: height,
            });
            initializeCanvas.backgroundColor = "#fff";
            initializeCanvas.renderAll();
            setCanvas(initializeCanvas);
            canvasInstanceRef.current = initializeCanvas;

            return () => {
                initializeCanvas.dispose();
            };
        }
    }, [width, height]);

    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: "shape",
        drop: (
            item: { name: string; shape: FabricObject; canvas: Canvas },
            monitor
        ) => {
            const currentCanvas = canvasInstanceRef.current;
            if (!currentCanvas) return;
            const clientOffset = monitor.getClientOffset();
            if (clientOffset && canvasRef.current) {
                const canvasRect = canvasRef.current.getBoundingClientRect();
                const x = clientOffset.x - canvasRect.left;
                const y = clientOffset.y - canvasRect.top;

                const shapeWidth = item.shape.width * item.shape.scaleX || 0;
                const shapeHeight = item.shape.height * item.shape.scaleY || 0;

                item.shape.set({
                    left: x - shapeWidth / 2,
                    top: y - shapeHeight / 2,
                });

                currentCanvas.add(item.shape);
                currentCanvas.renderAll();
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }));

    const handleDrop = useCallback(
        (node: HTMLDivElement) => {
            if (node) {
                drop(node);
            }
        },
        [drop]
    );

    function zoomIn() {
        util.requestAnimFrame(function () {
            setZoomLevel(zoomLevel + 0.1);
            canvas?.setZoom(zoomLevel);
        });
    }

    function zoomOut() {
        util.requestAnimFrame(function () {
            setZoomLevel(zoomLevel - 0.1);
            if (zoomLevel < 0.1) setZoomLevel(0.1);
            canvas?.setZoom(zoomLevel);
        });
    }

    return (
        <div>
            <div className="w-full h-screen flex items-center justify-between">
                <div className="w-1/3">
                    {canvas && <Tools canvas={canvas} />}
                </div>
                <div
                    ref={handleDrop}
                    className="relative"
                    style={{ width: width + 50, height: height + 50 }}
                >
                    <div className="absolute top-0 left-0 w-full text-center text-sm font-bold  z-10 pointer-events-none">
                        Width: {width}px
                    </div>

                    <div className="absolute top-0 -left-10 h-full flex items-center rotate-90  text-sm font-bold z-10 pointer-events-none">
                        Height: {height}px
                    </div>

                    <div className="m-10 bg-white">
                        <canvas
                            ref={canvasRef}
                            width={width}
                            height={height}
                            className="block"
                        ></canvas>
                    </div>
                </div>
                <div className="w-1/3">
                    <button onClick={zoomIn}>zoom in</button>
                    <button onClick={zoomOut}>zoom out</button>
                    {canvas && <Settings canvas={canvas} />}
                </div>
            </div>
        </div>
    );
};

CanvasComponent.displayName = "CanvasComponent";

export default CanvasComponent;
