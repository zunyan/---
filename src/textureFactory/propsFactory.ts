import { Loader, Rectangle, Texture } from "pixi.js";
import { COMMON_TEXTURE } from "../COMMON";
import { TGamePropEnum } from "../global.d";

export default function propsFactory(): Record<TGamePropEnum, Texture> {
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
        [TGamePropEnum.TGamePropEnum_NONE]: fix(item_63),
        [TGamePropEnum.TGamePropEnum_LOTION]: fix(item_61),
        [TGamePropEnum.TGamePropEnum_BUBBLES]: fix(item_62),
        [TGamePropEnum.TGamePropEnum_SHOSE]: fix(item_63),
    }
}