import { Loader, Sprite } from "pixi.js";
import app from "../app";
import { COMMON_TEXTURE } from "../COMMON";
import UIButton from "../sprites/UIButton";
import btnFactory from "../textureFactory/btnfactory";
import GameStage from "./game";
import Stage from "./stage";
import qs from 'qs'
import store from "../store";
import HallStage from "./hall";

export default class HomeStage extends Stage {
  constructor() {
    super()

    const bg = new Sprite(Loader.shared.resources[COMMON_TEXTURE.bg].texture)
    bg.anchor.set(.5, .5)
    bg.scale.x = .7
    bg.scale.y = .7
    bg.x = this.width / 2
    bg.y = this.height / 2
    this.addChild(bg)


    const startButton = new UIButton(
      "开始游戏",
      120,
      60
    )
    startButton.on('click', () => {
      if (!store.name) {
        const name = prompt('尊姓大名')
        if (!name) {
          return
        }
        location.search = qs.stringify(
          Object.assign(
            qs.parse(location.search.replace('?', '')),
            {
              name
            }
          )
        )
        store.name = name
      }
      app.push(HallStage)
    })
    startButton.x = this.width / 2 - startButton.width / 2
    startButton.y = this.height - 100 - startButton.height / 2
    this.addChild(startButton)

    setTimeout(()=>{
      if (store.name) {
        app.push(HallStage)
      }
    }, 100)
  }
}