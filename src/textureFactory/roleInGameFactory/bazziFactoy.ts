import { Loader, Rectangle, Texture } from "pixi.js";
import { roleAniScheme } from "./roleAniScheme";



let cache: any;

export default function bazziFactoy(): Record<roleAniScheme, Texture> {
    const texture = Loader.shared.resources['assets/bazzi.png'].texture
    return cache = cache || {
        down_4: new Texture(<any>texture, new Rectangle(154, 352, 42, 55)),
        down_3: new Texture(<any>texture, new Rectangle(154, 279, 42, 57)),
        down_2: new Texture(<any>texture, new Rectangle(154, 210, 42, 55)),
        down_1: new Texture(<any>texture, new Rectangle(154, 137, 42, 57)),
        down_5: new Texture(<any>texture, new Rectangle(382, 67, 44, 56)),

        up_1: new Texture(<any>texture, new Rectangle(81, 137, 44, 57)),
        up_2: new Texture(<any>texture, new Rectangle(81, 210, 44, 55)),
        up_3: new Texture(<any>texture, new Rectangle(81, 280, 44, 56)),
        up_4: new Texture(<any>texture, new Rectangle(81, 352, 44, 55)),
        up_5: new Texture(<any>texture, new Rectangle(311, 67, 44, 56)),

        right_1: new Texture(<any>texture, new Rectangle(225, 207, 42, 58)),
        right_2: new Texture(<any>texture, new Rectangle(294, 207, 44, 58)),
        right_3: new Texture(<any>texture, new Rectangle(366, 207, 43, 58)),
        right_4: new Texture(<any>texture, new Rectangle(438, 207, 41, 58)),
        right_5: new Texture(<any>texture, new Rectangle(450, 67, 42, 56)),
    }
}