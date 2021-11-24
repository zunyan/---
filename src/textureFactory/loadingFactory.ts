import { Loader, Rectangle, Texture } from "pixi.js";
import { COMMON_TEXTURE } from "../COMMON";

type TLoadingTextures = Texture[]

let cache: TLoadingTextures
export default function loadingFactory(): TLoadingTextures {
    const basegTexture = Loader.shared.resources[COMMON_TEXTURE.loading].texture

    return cache = cache || [
        new Texture(<any>basegTexture, new Rectangle(0, 0, 100, 100)),
        new Texture(<any>basegTexture, new Rectangle(100 * 1, 0, 100, 100)),
        new Texture(<any>basegTexture, new Rectangle(100 * 2, 0, 100, 100)),
        new Texture(<any>basegTexture, new Rectangle(100 * 3, 0, 100, 100)),
        new Texture(<any>basegTexture, new Rectangle(100 * 4, 0, 100, 100)),
        new Texture(<any>basegTexture, new Rectangle(100 * 5, 0, 100, 100)),
        new Texture(<any>basegTexture, new Rectangle(100 * 6, 0, 100, 100)),
        new Texture(<any>basegTexture, new Rectangle(100 * 7, 0, 100, 100))
    ]

}
