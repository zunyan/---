import { Container } from "@pixi/display";
import { Sprite } from "@pixi/sprite";
import { GRID_WIDTH } from "../constant";
import textureFactory from "../textureFactory";
import mapFactory from "../textureFactory/mapFactory";
import * as TWEEN from '@tweenjs/tween.js'
import { DisplayObject } from "pixi.js";

export default class Props extends Container {
    constructor(prop: string) {
        super()

        const textureMap = textureFactory().bazzi
        const shadow = new Sprite(textureMap.shadow);
        shadow.anchor.set(0.5, 1);
        shadow.y = -4
        shadow.x = GRID_WIDTH / 2 - 1
        // shadow.x = x + GRID_WIDTH /  2;
        // shadow.y = y + GRID_WIDTH /  2;

        const block = new Sprite((mapFactory().map_pirate as any)[prop]);
        block.y = -10
        // block.anchor.set(0, 0.5);
        this.addChild(shadow)
        this.addChild(block)

        // const tween = new TWEEN.Tween(block) // Create a new tween that modifies 'coords'.
        //     .to(<Partial<DisplayObject>>{ y: -20 }, 150) // Move to (300, 200) in 1 second.
        //     .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
        //     .start() // Start the tween immediately.
        //     .repeat(Infinity)

    }


}