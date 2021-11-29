import { Loader, Rectangle, Texture } from "pixi.js";
import { COMMON_TEXTURE } from "../../COMMON";
import { roleAniScheme } from "./roleAniScheme";

let cache: any;

export default function cappiFactoy(): Record<roleAniScheme, Texture> {
    const texture = Loader.shared.resources[COMMON_TEXTURE.unit_cappi].texture
    return cache = cache || {
        down_4: new Texture(<any>texture, new Rectangle(137, 130, 52, 56)),
        down_3: new Texture(<any>texture, new Rectangle(137, 201, 52, 56)),
        down_2: new Texture(<any>texture, new Rectangle(137, 272, 52, 56)),
        down_1: new Texture(<any>texture, new Rectangle(137, 343, 52, 56)),
        down_5: new Texture(<any>texture, new Rectangle(348, 43, 52, 56)),

        up_1: new Texture(<any>texture, new Rectangle(66, 131, 53, 56)),
        up_2: new Texture(<any>texture, new Rectangle(66, 201, 52, 56)),
        up_3: new Texture(<any>texture, new Rectangle(66, 272, 52, 56)),
        up_4: new Texture(<any>texture, new Rectangle(66, 342, 52, 57)),
        up_5: new Texture(<any>texture, new Rectangle(276, 44, 52, 55)),

        right_1: new Texture(<any>texture, new Rectangle(250, 140, 49, 56)),
        right_2: new Texture(<any>texture, new Rectangle(325, 140, 49, 56)),
        right_3: new Texture(<any>texture, new Rectangle(396, 140, 49, 57)),
        right_4: new Texture(<any>texture, new Rectangle(465, 140, 49, 57)),
        right_5: new Texture(<any>texture, new Rectangle(419, 43, 45, 55)),
    }
}