import { Loader, Rectangle, Texture } from "pixi.js";
import { COMMON_TEXTURE } from "../COMMON";

interface TBtnTextures {
   blueBtn: Texture,
   btn_pre_page: Texture,
   btn_next_page: Texture,
   btn_create_room: Texture,
}

let cache: TBtnTextures
export default function btnFactory(): TBtnTextures {
    const blueBtn = Loader.shared.resources[COMMON_TEXTURE.btn_blue].texture
    
    return cache = cache || {
       blueBtn: blueBtn,
       btn_pre_page: Loader.shared.resources[COMMON_TEXTURE.btn_pre_page].texture,
       btn_next_page: Loader.shared.resources[COMMON_TEXTURE.btn_next_page].texture,
       btn_create_room: Loader.shared.resources[COMMON_TEXTURE.btn_create_room].texture,
    }
}
