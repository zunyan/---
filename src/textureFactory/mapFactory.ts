import { Loader, Rectangle, Texture } from "pixi.js";
import { COMMON_TEXTURE } from "../COMMON";

export default function mapFactory() {
    const texture = Loader.shared.resources['assets/map_flopy_tile2.png'].texture


    const map_pirate = Loader.shared.resources[COMMON_TEXTURE.map_pirate_tile2].texture
    const map_pirate_items = Loader.shared.resources[COMMON_TEXTURE.map_pirate_tile6].texture
    const map_pirate_object1 = Loader.shared.resources[COMMON_TEXTURE.map_pirate_object1].texture
    const item_61 = Loader.shared.resources[COMMON_TEXTURE.item_61].texture
    const item_62 = Loader.shared.resources[COMMON_TEXTURE.item_62].texture
    const item_63 = Loader.shared.resources[COMMON_TEXTURE.item_63].texture

    const fix = (texture: any, x: number = 0, y: number = 0, w?: number, h?: number) => new Texture(
        texture,
        new Rectangle(x, y, w || texture.width, h || texture.height),
        undefined,
        undefined,
        undefined,
        { x: 0, y: 1 }
    )
    return {
        map_flopy_tile2_1: new Texture(<any>texture, new Rectangle(0, 0, 40, 40)),

        map_pirate: {
            floor1: fix(map_pirate, 0, 0, 41, 40),
            floor2: fix(map_pirate, 40, 0, 41, 40),
            floor3: fix(map_pirate, 81, 0, 41, 40),
            floor4: fix(map_pirate, 121, 0, 41, 40),
            floor5: fix(map_pirate, 160, 0, 40, 40),

            light: fix(map_pirate_items, 320, 0, 40, 160),
            pirate: fix(map_pirate_items, 0, 0, 80, 160),
            pirate2: fix(map_pirate_items, 80, 0, 80, 160),
            pirate3: fix(map_pirate_items, 160, 0, 120, 160),
            house: fix(map_pirate_items, 280, 0, 40, 80),
            stone: fix(map_pirate_items, 280, 80, 40, 80),
            cask: fix(map_pirate_items, 360, 80, 40, 80),

            b1: fix(map_pirate_items, 400, 80, 40, 80),
            b2: fix(map_pirate_items, 440, 80, 40, 80),
            b3: fix(map_pirate_items, 480, 80, 40, 80),
            b4: fix(map_pirate_items, 520, 80, 40, 80),
            b5: fix(map_pirate_items, 560, 80, 40, 80),
            b6: fix(map_pirate_items, 360, 0, 40, 80),
            b7: fix(map_pirate_items, 400, 0, 40, 80),
            b8: fix(map_pirate_items, 440, 0, 40, 80),
            b9: fix(map_pirate_items, 480, 0, 40, 80),
            b10: fix(map_pirate_items, 520, 0, 40, 80),

            box1: fix(map_pirate_object1),

            item_61: fix(item_61),
            item_62: fix(item_62),
            item_63: fix(item_63),
        }


    }
}