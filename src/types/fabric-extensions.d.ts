// fabric-extensions.d.ts
import "fabric";

declare module "fabric" {
    interface FabricObject {
        id: string;
        radius: number;
    }
}
