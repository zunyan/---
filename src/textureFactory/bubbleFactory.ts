import { Loader, Rectangle, Texture } from "pixi.js";

interface TBubbleTextures {

    empty: Texture,

    RANBOW: Texture[],
    BLUE: Texture[],
    BLACK: Texture[],
    RED: Texture[],
    DARK_RED: Texture[],
    RED_AND_BLUE: Texture[],
    SOAP: Texture[],
    Skulls: Texture[],
    black_flame: Texture[],
    ocean: Texture[],

    shodow: Texture,

    // 爆炸动画
    boom_ani_3: Texture,
    boom_ani_2: Texture,
    boom_ani_1: Texture,

    // // 向上爆炸的水柱动画
    boom_up_1: Texture,
    boom_up_2: Texture,
    boom_up_3: Texture,
    boom_up_4: Texture,
    boom_up_end_1: Texture,
    boom_up_end_2: Texture,
    boom_up_end_3: Texture,
    boom_up_end_4: Texture,

    // // 向下爆炸的水柱动画
    boom_down_1: Texture,
    boom_down_2: Texture,
    boom_down_3: Texture,
    boom_down_4: Texture,
    boom_down_end_1: Texture,
    boom_down_end_2: Texture,
    boom_down_end_3: Texture,
    boom_down_end_4: Texture,

}

let cache: TBubbleTextures
export default function bubbleFactory(): TBubbleTextures {
    const texture1 = Loader.shared.resources['assets/custom_bubble_95.png'].texture
    const texture2 = Loader.shared.resources['assets/custom_bubble_96.png'].texture
    const texture3 = Loader.shared.resources['assets/custom_bubble_97.png'].texture
    const texture4 = Loader.shared.resources['assets/custom_bubble_98.png'].texture
    const texture5 = Loader.shared.resources['assets/custom_bubble_99.png'].texture
    const texture6 = Loader.shared.resources['assets/custom_bubble_100.png'].texture
    const texture7 = Loader.shared.resources['assets/custom_bubble_101.png'].texture
    const texture8 = Loader.shared.resources['assets/custom_bubble_102.png'].texture
    const texture9 = Loader.shared.resources['assets/custom_bubble_103.png'].texture
    const texture10 = Loader.shared.resources['assets/custom_bubble_104.png'].texture
    // const texture10 = Loader.shared.resources['assets/custom_bubble_104.png'].texture
    // const texture11 = Loader.shared.resources['assets/custom_bubble_105.png'].texture
    // const texture12 = Loader.shared.resources['assets/custom_bubble_106.png'].texture
    // const texture13 = Loader.shared.resources['assets/custom_bubble_107.png'].texture
    // const texture14 = Loader.shared.resources['assets/custom_bubble_108.png'].texture
    const baseTexture: any = Loader.shared.resources['assets/unit_bombwater.png'].texture

    function fn(texture: any) {
        return [
            new Texture(texture, new Rectangle(13, 21, 44, 41)),
            new Texture(texture, new Rectangle(85, 21, 44, 41)),
            new Texture(texture, new Rectangle(158, 21, 44, 41)),
        ]
    }

    return cache = cache || {

        empty: new Texture(baseTexture, new Rectangle(0, 0, 40, 40)),

        RANBOW: fn(texture1),
        BLUE: fn(texture2),
        BLACK: fn(texture3),
        RED: fn(texture4),
        DARK_RED: fn(texture5),
        RED_AND_BLUE: fn(texture6),
        SOAP: fn(texture7),
        Skulls: fn(texture8),
        black_flame: fn(texture9),
        ocean: fn(texture10),

        shodow: new Texture(baseTexture, new Rectangle(196, 42, 42, 39)),

        // 爆炸动画
        boom_ani_3: new Texture(baseTexture, new Rectangle(143, 115, 39, 37)),
        boom_ani_2: new Texture(baseTexture, new Rectangle(85, 114, 38, 38)),
        boom_ani_1: new Texture(baseTexture, new Rectangle(28, 114, 38, 38)),

        // // 向上爆炸的水柱动画
        boom_up_1: new Texture(baseTexture, new Rectangle(28, 344, 38, 38)),
        boom_up_2: new Texture(baseTexture, new Rectangle(86, 344, 38, 38)),
        boom_up_3: new Texture(baseTexture, new Rectangle(145, 344, 38, 38)),
        boom_up_4: new Texture(baseTexture, new Rectangle(202, 344, 38, 38)),
        boom_up_end_1: new Texture(baseTexture, new Rectangle(28, 185, 38, 38)),
        boom_up_end_2: new Texture(baseTexture, new Rectangle(86, 185, 38, 38)),
        boom_up_end_3: new Texture(baseTexture, new Rectangle(145, 185, 38, 38)),
        boom_up_end_4: new Texture(baseTexture, new Rectangle(202, 185, 38, 38)),

        // // 向下爆炸的水柱动画
        boom_down_1: new Texture(baseTexture, new Rectangle(28, 419, 38, 38)),
        boom_down_2: new Texture(baseTexture, new Rectangle(86, 419, 38, 38)),
        boom_down_3: new Texture(baseTexture, new Rectangle(145, 419, 38, 38)),
        boom_down_4: new Texture(baseTexture, new Rectangle(202, 419, 38, 38)),
        boom_down_end_1: new Texture(baseTexture, new Rectangle(28, 260, 38, 38)),
        boom_down_end_2: new Texture(baseTexture, new Rectangle(86, 260, 38, 38)),
        boom_down_end_3: new Texture(baseTexture, new Rectangle(145, 260, 38, 38)),
        boom_down_end_4: new Texture(baseTexture, new Rectangle(202, 260, 38, 38)),

    }
}
