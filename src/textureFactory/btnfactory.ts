import { Loader, Rectangle, Texture } from "pixi.js";
import { COMMON_TEXTURE } from "../COMMON";

interface TBtnTextures {
   blueBtn: Texture
}

let cache: TBtnTextures
export default function btnFactory(): TBtnTextures {
    const blueBtn = Loader.shared.resources[COMMON_TEXTURE["btn_blue.png"]].texture
    
    return cache = cache || {
       blueBtn: blueBtn
    }
}
