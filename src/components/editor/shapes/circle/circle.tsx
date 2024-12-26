import { Canvas, FabricObject } from "fabric";
import { useDrag } from "react-dnd";

interface Props {
    name: string;
    obj: FabricObject;
    canvas: Canvas;
}
const Circle = ({ name, obj, canvas }: Props) => {
    const [, drag] = useDrag(() => ({
        type: "shape",
        item: { name, shape: obj, canvas },
    }));

    return <button ref={drag}>Circle</button>;
};

export default Circle;
