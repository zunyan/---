import { Container, Graphics, Loader, Sprite } from "pixi.js";
import app from "../app";
import { COMMON_TEXTURE } from "../COMMON";
import { STAGE_HEIGHT, STAGE_WIDTH } from "../constant";
import bubbleFactory from "../textureFactory/bubbleFactory";
import GameStage from "./game";
import Stage from "./stage";

export default class HomeStage extends Stage {
    constructor() {
        super()

        const bg = new Sprite(Loader.shared.resources[COMMON_TEXTURE["bg.jpg"]].texture)
        bg.width = this.width
        bg.height = this.height
        this.addChild(bg)

        const btn = new Sprite(bubbleFactory().BLACK[0])
        btn.interactive = true
        btn.width = 200
        btn.height = 80
        btn.on('click', ()=>{
            app.push(GameStage)
        })
        this.addChild(btn)
    }
}