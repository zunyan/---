import { AnimatedSprite, Container, Loader, Sprite } from "pixi.js";
import { GRID_HEIGHT, GRID_WIDTH } from "../constant";
import { TBubbleStyle, TPersonTextureMap } from "../global";
import GameStage from "../stage/game";
import GameContent from "../stage/gameContent";
import textureFactory from "../textureFactory";
import bubbleFactory from "../textureFactory/bubbleFactory";
import Bubble from "./bubble";

type TPersonMoveTarget = "Left" | "Right" | "Up" | "Down" | "None"

export default class Person extends Container {

  keyEvent: string[] = []

  // 
  gridX: number = 0
  gridY: number = 0
  speed: number = 5
  sprite: AnimatedSprite;
  textureMap
  booms: any;
  power: number = 1

  // style setting
  bubbleStyle: TBubbleStyle = "RANBOW"
  _moveTarget: TPersonMoveTarget = "None";

  constructor(gridX: number, gridY: number) {
    super()

    this.zIndex = 2;

    this.gridX = gridX
    this.gridY = gridY
    this.x = gridX * GRID_WIDTH + GRID_WIDTH / 2
    this.y = gridY * GRID_HEIGHT + GRID_HEIGHT / 2

    this.textureMap = textureFactory().bazzi
    // shadow
    const shadow = new Sprite(this.textureMap.shadow)
    shadow.anchor.set(.5, -0.2)
    // shadow.alpha = 0.7
    this.addChild(shadow)

    this.sprite = new AnimatedSprite([
      this.textureMap.down_1,
      this.textureMap.down_2,
      this.textureMap.down_3,
      this.textureMap.down_4,
      this.textureMap.down_5,
    ], true)

    this.sprite.loop = true
    this.sprite.animationSpeed = 0.17
    this.sprite.anchor.set(0.5, 0.75)
    this.sprite.gotoAndStop(4)
    this.addChild(this.sprite)

  }

  set moveTarget(val: TPersonMoveTarget) {
    this._moveTarget = val
    this.sprite.scale.set(1, 1);
    switch (this.moveTarget) {
      case "Left":
        this.sprite.textures = [
          this.textureMap.right_1,
          this.textureMap.right_2,
          this.textureMap.right_3,
          this.textureMap.right_4,
          this.textureMap.right_5,
        ]
        this.sprite.scale.set(-1, 1);
        break;
      case "Right":
        this.sprite.textures = [
          this.textureMap.right_1,
          this.textureMap.right_2,
          this.textureMap.right_3,
          this.textureMap.right_4,
          this.textureMap.right_5,
        ]
        break;
      case "Up":
        this.sprite.textures = [
          this.textureMap.up_1,
          this.textureMap.up_2,
          this.textureMap.up_3,
          this.textureMap.up_4,
          this.textureMap.up_5,
        ]
        break;
      case "Down":
        this.sprite.textures = [
          this.textureMap.down_1,
          this.textureMap.down_2,
          this.textureMap.down_3,
          this.textureMap.down_4,
          this.textureMap.down_5,
        ]
        break;
    }
  }

  get moveTarget(): TPersonMoveTarget {
    return this._moveTarget
  }

  handleKeydown(e: KeyboardEvent) {
    if (this.keyEvent.some(item => item == e.code)) {
      return
    }

    if ([
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown"
    ].includes(e.code)) {
      this.moveTarget = <any>{
        "ArrowLeft": "Left",
        "ArrowRight": "Right",
        "ArrowUp": "Up",
        "ArrowDown": 'Down'
      }[e.code]
      this.keyEvent.push(e.code)
    } else if (e.code == 'Space') {

      (this.parent as GameContent).onCreateBubble(
        this.gridX,
        this.gridY,
        this.bubbleStyle,
        this.power
      )

    }
  }
  handleKeyup(e: KeyboardEvent) {
    if ([
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown"
    ].includes(e.code)) {
      this.sprite.stop()
      this.keyEvent = this.keyEvent.filter(item => item != e.code)
      switch (this.keyEvent[this.keyEvent.length - 1]) {
        case "ArrowLeft": this.moveTarget = 'Left'; break;
        case "ArrowRight": this.moveTarget = 'Right'; break;
        case "ArrowUp": this.moveTarget = 'Up'; break;
        case "ArrowDown": this.moveTarget = 'Down'; break;
        default:
          this.moveTarget = 'None'
      }
    }
  }

  onUpdate() {
    if (this.moveTarget == 'None') {
      this.sprite.gotoAndStop(4)
      return;
    } else if (!this.sprite.playing) {
      this.sprite.play()
    }

    let x = this.x;
    let y = this.y;
    switch (this.moveTarget) {
      case 'Left': x -= this.speed; break;
      case 'Right': x += this.speed; break;
      case 'Up': y -= this.speed; break;
      case 'Down': y += this.speed; break;
    }

    let gridX = Math.floor(x / GRID_WIDTH)
    let gridY = Math.floor(y / GRID_HEIGHT)

    // let nextGridX = gridX
    // let nextGridY = gridY
    // switch (this.moveTarget) {
    //   case 'Left': nextGridX--; break;
    //   case 'Right': nextGridX++; break;
    //   case 'Up': nextGridY--; break;
    //   case 'Down': nextGridY++; break;
    // }

    if (
      (this.gridX == gridX && this.gridY == gridY) ||
      (this.parent as GameContent).iCanGo(gridX, gridY)

    ) {
      // 更新grid
      this.gridX = gridX
      this.gridY = gridY
      this.x = x
      this.y = y
    }
  }
}