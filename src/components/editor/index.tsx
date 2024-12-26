"use client";

import { Canvas } from "fabric";
import { useEffect, useRef, useState } from "react";
import Tools from "./tools";
import Settings from "../settings";
import { DndProvider, useDrop } from "react-dnd";
import CanvasComponent from "./canvas";
import { HTML5Backend } from "react-dnd-html5-backend";

const Editor = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <CanvasComponent width={800} height={500} />
        </DndProvider>
    );
};

export default Editor;
