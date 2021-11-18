import { Loader, Rectangle, Texture } from "pixi.js";

export default function mapFactory() {
    const texture = Loader.shared.resources['assets/map_flopy_tile2.png'].texture
    return {
        map_flopy_tile2_1: new Texture(<any>texture, new Rectangle(0, 0, 40, 40)),

    }
}