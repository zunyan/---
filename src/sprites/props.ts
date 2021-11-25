import { Container } from "@pixi/display";
import { Sprite } from "@pixi/sprite";
import { GRID_WIDTH } from "../constant";
import { TGamePropEnum } from "../global.d";
import bazziFactoy from "../textureFactory/bazziFactoy";
import propsFactory from "../textureFactory/propsFactory";

export default class Props extends Container {
    constructor(prop: TGamePropEnum) {
        super()

        const shadow = new Sprite(bazziFactoy().shadow);
        shadow.anchor.set(0.5, 1);
        shadow.y = -4
        shadow.x = GRID_WIDTH / 2 - 1
        // shadow.x = x + GRID_WIDTH /  2;
        // shadow.y = y + GRID_WIDTH /  2;

        const block = new Sprite(propsFactory()[prop]);
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