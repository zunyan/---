import { Container, Graphics, Loader, Sprite } from "pixi.js";
import app from "../app";
import { COMMON_TEXTURE } from "../COMMON";
import { STAGE_HEIGHT, STAGE_WIDTH } from "../constant";
import UIButton from "../sprites/UIButton";
import btnFactory from "../textureFactory/btnfactory";
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

        const startButton = new UIButton(
            "开始游戏",
            btnFactory().blueBtn
        )
        startButton.on('click', () => {
            app.push(GameStage)
        })
        startButton.x = this.width / 2
        startButton.y = this.height - 100
        this.addChild(startButton)
    }
}