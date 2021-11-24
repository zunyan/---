import { Container } from "@pixi/display";
import { Graphics } from "@pixi/graphics";
import { Sprite } from "@pixi/sprite";
import { Text, TextStyle } from "@pixi/text";

export default class UIButton extends Container{
    constructor(title: string,  width: number, height: number, style?: Partial<TextStyle>){
        super()

        const text = new Text(title, new TextStyle(Object.assign({
            align: 'center',
            fontSize: 16,
            fill: 0xffffff,
            dropShadow: true,
            dropShadowAlpha: 0.3,
            dropShadowBlur: 5,
            fontWeight: "bold",
            letterSpacing: 3
        }, style || {})))
        text.anchor.set(.5, .5)

        width = Math.max(text.width + 20, width)
        height = Math.max(text.height + 20, height)

        const bg = new Container()
        const g = new Graphics()
        g.lineStyle({
            color: 0x0766a0,
            width: 1
        })
        g.beginFill(0x229af0)
        g.drawRoundedRect(0, 0, width, height, Math.min(15, height / 5))
        g.endFill()
        g.lineStyle({
            color: 0xffffff,
            alpha: 0.5,
            width: 1
        })
        g.drawRoundedRect(2, 2, width - 4, height - 4, Math.min(15, height / 5))

        const upper = new Graphics()
        upper.lineStyle({
            color: 0x0766a0,
            width: 1
        })
        upper.beginFill(0x52bbff)
        upper.drawRoundedRect(0, 0, width, height, 15)
        upper.endFill()
        upper.lineStyle({
            color: 0xffffff,
            alpha: 0.5,
            width: 1
        })
        upper.drawRoundedRect(2, 2, width - 4, height - 4, 15)

        const mask = new Graphics()
        mask.beginFill(0xffffff)
        mask.drawRect(0, 0, width, height / 2)
        mask.endFill()
        upper.mask = mask

        this.addChild(g)
        this.addChild(upper)
        this.addChild(mask)

        this.interactive = true

        text.x = this.width / 2
        text.y = this.height / 2
        this.addChild(text)
        this.cacheAsBitmap = true
     
    }
}