import { Texture } from "@pixi/core";
import { Container } from "@pixi/display";
import { Graphics } from "@pixi/graphics";
import { Sprite } from "@pixi/sprite";
import { Text, TextStyle } from "@pixi/text";
import btnFactory from "../textureFactory/btnfactory";

export default class UIButton extends Sprite{
    constructor(title: string, texture: Texture){
        super(texture)

        this.interactive = true
        this.anchor.set(.5, .5)
        const text =new Text(title, new TextStyle({
            align: 'center',
            fontSize: 24,
            fill: 0xffffff,
            dropShadow: true,
            dropShadowAlpha: 0.3,
            dropShadowBlur: 5,
            fontWeight: "bold",
            letterSpacing: 3
            
        }))
        text.anchor.set(.5, .5)
        this.addChild(text)
     
    }
}