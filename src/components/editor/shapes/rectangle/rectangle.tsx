import { Canvas, FabricObject } from "fabric";
import { useDrag } from "react-dnd";

interface Props {
    name: string;
    obj: FabricObject;
    canvas: Canvas;
}
const Rectangle = ({ name, obj, canvas }: Props) => {
    const [, drag] = useDrag(() => ({
        type: "shape",
        item: { name, shape: obj, canvas },
    }));

    return <button ref={drag}>Rectangle</button>;
};

export default Rectangle;
