import {
    AnimatedSprite, Container, Graphics,
} from "pixi.js";
import loadingFactory from "../textureFactory/loadingFactory";
export default class UILoading extends Container {
    constructor() {
        super();
        const box = new Graphics();
        box.beginFill(0x000000);
        box.drawRect(0, 0, 1334, 750);
        box.interactive = true;
        box.alpha = 0;
        const loading = new AnimatedSprite(loadingFactory())
        loading.loop = true;
        loading.animationSpeed = 0.3
        loading.anchor.set(0.5, 0.5)
        loading.x = 1334 / 2;
        loading.y = 750 / 2;
        loading.play()

        this.addChild(box);
        this.addChild(loading);
    }
}
