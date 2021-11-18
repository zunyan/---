import { AnimatedSprite, Container, Graphics, Sprite, Texture } from "pixi.js";
import { GRID_HEIGHT, GRID_WIDTH } from "../constant";
import bubbleFactory from "../textureFactory/bubbleFactory";

export default class Bubble extends Container {
    power: number = 4
    gridX: number
    gridY: number
    srpite: AnimatedSprite;
    shodow: Sprite;
    constructor(textures: Texture[], gridX: number, gridY: number, power: number) {
        super()

        const shodow = this.shodow = new Sprite(bubbleFactory().shodow)
        shodow.anchor.set(.5, .5)
        shodow.y = 3
        this.addChild(shodow)

        const srpite = this.srpite = new AnimatedSprite(textures, true)
        this.power = power
        this.gridX = gridX
        this.gridY = gridY
        this.x = gridX * GRID_WIDTH + GRID_WIDTH / 2
        this.y = gridY * GRID_HEIGHT + GRID_HEIGHT / 2 - 5
        srpite.loop = true
        srpite.animationSpeed = 0.14
        srpite.anchor.set(0.5, 0.5)
        srpite.play()

        this.addChild(srpite)

    }


    async boom() {
        this.srpite.textures = [
            bubbleFactory().boom_ani_1,
            bubbleFactory().boom_ani_2,
            bubbleFactory().boom_ani_3,
            bubbleFactory().empty
        ]
        this.srpite.gotoAndPlay(0)
        this.srpite.loop = false

        this.removeChild(this.shodow)

        for (let i = 1; i <=this.power; i++) {
            const up = new AnimatedSprite([
                bubbleFactory().boom_up_2,
                bubbleFactory().boom_up_1,
                bubbleFactory().boom_up_1,
                bubbleFactory().boom_up_1,
                bubbleFactory().boom_up_3,
                bubbleFactory().boom_up_4,
                bubbleFactory().boom_up_end_4,
                bubbleFactory().empty
            ], true)

            const down = new AnimatedSprite([
                bubbleFactory().boom_down_2,
                bubbleFactory().boom_down_1,
                bubbleFactory().boom_down_1,
                bubbleFactory().boom_down_1,
                bubbleFactory().boom_down_3,
                bubbleFactory().boom_down_4,
                bubbleFactory().boom_down_end_4,
                bubbleFactory().empty
            ], true)

            const left = new AnimatedSprite([
                bubbleFactory().boom_down_2,
                bubbleFactory().boom_down_1,
                bubbleFactory().boom_down_1,
                bubbleFactory().boom_down_1,
                bubbleFactory().boom_down_3,
                bubbleFactory().boom_down_4,
                bubbleFactory().boom_down_end_4,
                bubbleFactory().empty
            ], true)

            const right = new AnimatedSprite([
                bubbleFactory().boom_down_2,
                bubbleFactory().boom_down_1,
                bubbleFactory().boom_down_1,
                bubbleFactory().boom_down_1,
                bubbleFactory().boom_down_3,
                bubbleFactory().boom_down_4,
                bubbleFactory().boom_down_end_4,
                bubbleFactory().empty
            ], true)

            up.width = GRID_WIDTH
            up.height = GRID_HEIGHT
            up.anchor.set(.5, .5)
            up.x = 0
            up.y = -i * GRID_HEIGHT
            up.animationSpeed = .3
            up.loop = false

            down.width = GRID_WIDTH
            down.height = GRID_HEIGHT
            down.anchor.set(.5, .5)
            down.x = 0
            down.y = i * GRID_HEIGHT
            down.animationSpeed = .3
            down.loop = false


            left.width = GRID_WIDTH
            left.height = GRID_HEIGHT
            left.anchor.set(.5, .5)
            left.y = 0
            left.x = -i * GRID_HEIGHT
            left.animationSpeed = .3
            left.loop = false


            right.width = GRID_WIDTH
            right.height = GRID_HEIGHT
            right.anchor.set(.5, .5)
            right.y = 0
            right.x = i * GRID_HEIGHT
            right.animationSpeed = .3
            right.loop = false


            up.play()
            down.play()
            left.play()
            right.play()

            this.addChild(up)
            this.addChild(down)
            this.addChild(left)
            this.addChild(right)
            await new Promise(resolve => setTimeout(resolve, 10))
        }

        const up = new AnimatedSprite([
            bubbleFactory().boom_up_end_1,
            bubbleFactory().boom_up_end_2,
            bubbleFactory().boom_up_end_3,
            bubbleFactory().boom_up_end_4,
            bubbleFactory().empty
        ], true)
        const down = new AnimatedSprite([
            bubbleFactory().boom_down_end_1,
            bubbleFactory().boom_down_end_2,
            bubbleFactory().boom_down_end_3,
            bubbleFactory().boom_down_end_4,
            bubbleFactory().empty
        ], true)

        up.width = GRID_WIDTH
        up.height = GRID_HEIGHT
        up.anchor.set(.5, .5)
        up.x = 0
        up.y = this.power * GRID_HEIGHT
        up.animationSpeed = 0.1
        up.loop = false

        down.width = GRID_WIDTH
        down.height = GRID_HEIGHT
        down.anchor.set(.5, .5)
        down.x = 0
        down.y = this.power * GRID_HEIGHT
        down.animationSpeed = 0.1
        down.loop = false

        up.play()
        down.play()

        this.addChild(up)
        this.addChild(down)

        setTimeout(()=>{
            this.parent.removeChild(this)
        },300)

    }
}