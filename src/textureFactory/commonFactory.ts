import { Loader, Rectangle, Texture } from "pixi.js";

export default function commonFactory() {
    const texture = Loader.shared.resources['assets/bazzi.png'].texture
    return {
        shadow: new Texture(<any>texture, new Rectangle(395, 562, 32, 15))
    }
}