import { Container } from "@pixi/display";
import { Graphics } from "@pixi/graphics";
import { Sprite } from "@pixi/sprite";
import { Text, TextStyle } from "@pixi/text";
import { filters, Rectangle, Texture } from "pixi.js";
import btnFactory from "../textureFactory/btnfactory";

export default class UIButton extends Container {
    constructor(title: string, width: number, height: number, style?: Partial<TextStyle>) {
        super()

        const text = new Text(title, new TextStyle(Object.assign(<TextStyle>{
            align: 'center',
            fontSize: 16,
            fill: 0xffffff,
            strokeThickness: 3,
            fontWeight: "bold",
            letterSpacing: 3,
            stroke: 0x52bbff
        }, style || {})))
        text.anchor.set(.5, .5)

        const baseTexture = btnFactory().blueBtn
        const leftTop = new Sprite(new Texture(<any>baseTexture, new Rectangle(0, 0, 20, 20)))
        const rightTop = new Sprite(new Texture(<any>baseTexture, new Rectangle(baseTexture.width - 20, 0, 20, 20)))
        const leftBottom = new Sprite(new Texture(<any>baseTexture, new Rectangle(0, baseTexture.height - 20, 20, 20)))
        const rightBottom = new Sprite(new Texture(<any>baseTexture, new Rectangle(baseTexture.width - 20, baseTexture.height - 20, 20, 20)))
        const leftMid = new Sprite(new Texture(<any>baseTexture, new Rectangle(0, 20, 20, baseTexture.height - 40)))
        const rightMid = new Sprite(new Texture(<any>baseTexture, new Rectangle(baseTexture.width - 20, 20, 20, baseTexture.height - 40)))
        const top = new Sprite(new Texture(<any>baseTexture, new Rectangle(20, 0, baseTexture.width - 40, 20)))
        const bottom = new Sprite(new Texture(<any>baseTexture, new Rectangle(20, baseTexture.height - 20, baseTexture.width - 40, 20)))
        const center = new Sprite(new Texture(<any>baseTexture, new Rectangle(20, 20, baseTexture.width - 40, baseTexture.height - 40)))

        leftTop.x = leftBottom.x = leftMid.x = 0
        leftTop.y = top.y = rightTop.y = 0
        top.x = center.x = bottom.x = 20
        leftBottom.y = bottom.y = rightBottom.y = height - 20
        rightTop.x = rightMid.x = rightBottom.x = width - 20
        center.y = leftMid.y = rightMid.y = 20

        center.width = top.width = bottom.width = width - 40
        center.height = leftMid.height = rightMid.height = height - 40

        this.addChild(leftTop)
        this.addChild(rightTop)
        this.addChild(leftBottom)
        this.addChild(rightBottom)
        this.addChild(leftMid)
        this.addChild(rightMid)
        this.addChild(top)
        this.addChild(bottom)
        this.addChild(center)

        width = Math.max(text.width + 20, width)
        height = Math.max(text.height + 20, height)


        this.interactive = true;
        this.buttonMode = true;
        this.on('pointerdown', () => this.onHover())
        this.on('pointerup', () => this.reset())
        this.on('pointerleave', () => this.reset())
        this.on('pointerout', () => this.reset())
        this.on('touchendoutside', () => this.reset())
        this.on('touchend', () => this.reset())

        // const bg = new Container()
        // const g = new Graphics()
        // g.lineStyle({
        //     color: 0x0766a0,
        //     width: 1
        // })
        // g.beginFill(0x229af0)
        // g.drawRoundedRect(0, 0, width, height, Math.min(15, height / 5))
        // g.endFill()
        // g.lineStyle({
        //     color: 0xffffff,
        //     alpha: 0.5,
        //     width: 1
        // })
        // g.drawRoundedRect(2, 2, width - 4, height - 4, Math.min(15, height / 5))

        // const upper = new Graphics()
        // upper.lineStyle({
        //     color: 0x0766a0,
        //     width: 1
        // })
        // upper.beginFill(0x52bbff)
        // upper.drawRoundedRect(0, 0, width, height, 15)
        // upper.endFill()
        // upper.lineStyle({
        //     color: 0xffffff,
        //     alpha: 0.5,
        //     width: 1
        // })
        // upper.drawRoundedRect(2, 2, width - 4, height - 4, 15)

        // const mask = new Graphics()
        // mask.beginFill(0xffffff)
        // mask.drawRect(0, 0, width, height / 2)
        // mask.endFill()
        // upper.mask = mask

        // this.addChild(g)
        // this.addChild(upper)
        // this.addChild(mask)

        text.x = this.width / 2
        text.y = this.height / 2
        this.addChild(text)
        // this.cacheAsBitmap = true
    }

    onHover() {
        const filter = new filters.ColorMatrixFilter()
        filter.sepia(true)
        filter.saturate(4, true)
        filter.brightness(1.15, true)

        this.filters = [filter]
    }

    reset() {
        this.filters = []
    }
}