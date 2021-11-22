import { Loader, Rectangle, Texture } from "pixi.js";
import { COMMON_TEXTURE } from "../COMMON";

export default function mapFactory() {
    const texture = Loader.shared.resources['assets/map_flopy_tile2.png'].texture


    const map_pirate = Loader.shared.resources[COMMON_TEXTURE['map_pirate_tile2.png']].texture
    const map_pirate_items = Loader.shared.resources[COMMON_TEXTURE['map_pirate_tile6.png']].texture
    return {
        map_flopy_tile2_1: new Texture(<any>texture, new Rectangle(0, 0, 40, 40)),

        map_pirate: {
            floor1: new Texture(<any>map_pirate, new Rectangle(0, 0, 40, 40)),
            floor2: new Texture(<any>map_pirate, new Rectangle(40, 0, 40, 40)),
            floor3: new Texture(<any>map_pirate, new Rectangle(80, 0, 40, 40)),
            floor4: new Texture(<any>map_pirate, new Rectangle(120, 0, 40, 40)),
            floor5: new Texture(<any>map_pirate, new Rectangle(160, 0, 40, 40)),

            light: new Texture(<any>map_pirate_items, new Rectangle(320, 0, 40, 160), undefined, undefined, undefined, {
                x: 0, y: 0.75
            }),

            pirate: new Texture(<any>map_pirate_items, new Rectangle(0, 0, 80, 160), undefined, undefined, undefined, {
                x: 0, y: 0.75
            }),

            pirate2: new Texture(<any>map_pirate_items, new Rectangle(80, 0, 80, 160), undefined, undefined, undefined, {
                x: 0, y: 0.75
            }),

            pirate3: new Texture(<any>map_pirate_items, new Rectangle(160, 0, 120, 160), undefined, undefined, undefined, {
                x: 0, y: 0.75
            }),
        }

    }
}