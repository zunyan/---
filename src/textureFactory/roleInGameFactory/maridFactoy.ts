import { Loader, Rectangle, Texture } from "pixi.js";
import { COMMON_TEXTURE } from "../../COMMON";
import { roleAniScheme } from "./roleAniScheme";

let cache: any;

export default function maridFactoy(): Record<roleAniScheme, Texture> {
    const texture = Loader.shared.resources[COMMON_TEXTURE.unit_marid].texture
    return cache = cache || {
        right_5: new Texture(<any>texture, new Rectangle(357 ,137 ,46 ,55)),
        right_4: new Texture(<any>texture, new Rectangle(421 ,207 ,46 ,57)),
        right_3: new Texture(<any>texture, new Rectangle(350 ,207 ,46 ,57)),
        right_2: new Texture(<any>texture, new Rectangle(280 ,207 ,46 ,57)),
        right_1: new Texture(<any>texture, new Rectangle(209 ,208 ,46 ,56)),

        up_5: new Texture(<any>texture, new Rectangle(210 ,137 ,50 ,55)),
        up_4: new Texture(<any>texture, new Rectangle(64 ,347 ,49 ,58)),
        up_3: new Texture(<any>texture, new Rectangle(64 ,278 ,49 ,58)),
        up_2: new Texture(<any>texture, new Rectangle(64 ,206 ,49 ,58)),
        up_1: new Texture(<any>texture, new Rectangle(64 ,136 ,49 ,57)),

        down_5: new Texture(<any>texture, new Rectangle(281 ,137 ,50 ,55)),
        down_4: new Texture(<any>texture, new Rectangle(135 ,348 ,49 ,57)),
        down_3: new Texture(<any>texture, new Rectangle(135 ,279 ,49 ,57)),
        down_2: new Texture(<any>texture, new Rectangle(135 ,207 ,49 ,57)),
        down_1: new Texture(<any>texture, new Rectangle(135 ,137 ,49 ,57)),
    }
}




