import { DisplayObject, Graphics, Sprite, utils } from "pixi.js";
import app from "../app";
import { GRID_HEIGHT, GRID_HEIGHT_SIZE, GRID_WIDTH, GRID_WIDTH_SIZE, STAGE_HEIGHT, STAGE_WIDTH, GRID_WIDTH_BOX2, GRID_HEIGHT_BOX2, GRID_HEIGHT_BOX3, GRID_WIDTH_BOX3 } from "../constant";
import { Item, TBubbleStyle } from "../global";
import Block from "../sprites/block";
import Bubble from "../sprites/bubble";
import Person from "../sprites/person";
import bubbleFactory from "../textureFactory/bubbleFactory";
import mapFactory from "../textureFactory/mapFactory";
import Stage from "./stage";
import * as TWEEN from '@tweenjs/tween.js'
import PlayerList from "../sprites/playerList";
import Timer from "../sprites/timer";
import { priateMap } from '../map/pirate'

export default class GameStage extends Stage {

  person: any;
  bubbles: Bubble[] = [];
  map: Block[][] = [];

  constructor() {
    super()

    // 渲染框架
    const box1 = new Graphics()
    box1.beginFill(utils.rgb2hex([2 / 255, 94 / 255, 161 / 255]));
    box1.drawRect(0, 0, STAGE_WIDTH, STAGE_HEIGHT)

    box1.beginFill(0x000000);
    box1.drawRect(20, 100, GRID_WIDTH_BOX2, GRID_HEIGHT_BOX2)

    box1.beginFill(utils.rgb2hex([100 / 255, 100 / 255, 96 / 255]));
    box1.drawRect(28, 105, GRID_WIDTH_BOX3, GRID_HEIGHT_BOX3)

    priateMap.forEach((item: Item[], index) => {
      item.forEach((_item: Item, _index) => {
        const floor = new Sprite((mapFactory().map_pirate as any)[_item.floor])
        floor.x = _index * GRID_WIDTH + 28
        floor.y = index * GRID_WIDTH + 105
        floor.zIndex = 1

        if(_item.top){
          const block = new Sprite((mapFactory().map_pirate as any)[_item.top])
          block.x = _index * GRID_WIDTH + 28
          block.y = index * GRID_WIDTH + 105
          box1.addChild(block)
          block.zIndex = 2
        }
        box1.addChild(floor)
      })
    })

    this.addChild(box1)

    // timer
    const timer = new Timer()
    timer.x = 100
    this.addChild(timer)

    // playerlist
    const list = new PlayerList()
    this.addChild(list);
  //   //
  // }

  // temp() {
  //   this.drawMap()

    this.person = new Person(20, 10)

    this.person.interactive = true
    this.person.on('click', () => {
      app.back()
    })
    this.addChild(this.person)

    document.onkeydown = this.person.handleKeydown.bind(this.person)
    document.onkeyup = this.person.handleKeyup.bind(this.person)

  }

  drawMap() {
    const g = new Graphics()
    g.width = STAGE_WIDTH
    g.height = STAGE_HEIGHT
    g.lineStyle({
      width: 3,
      color: 0x000000
    })
    for (let i = 0; i < STAGE_WIDTH; i += GRID_WIDTH) {
      g.moveTo(i, 0)
      g.lineTo(i, STAGE_HEIGHT)
    }

    for (let i = 0; i < STAGE_HEIGHT; i += GRID_HEIGHT) {
      g.moveTo(0, i)
      g.lineTo(STAGE_WIDTH, i)
    }

    g.zIndex = 0
    this.addChild(g)

    for (let i = 0; i < STAGE_WIDTH / GRID_WIDTH; i++) {
      for (let j = 0; j < STAGE_HEIGHT / GRID_HEIGHT; j++) {
        this.map[i] = this.map[i] || []
        const block = new Block(mapFactory().map_flopy_tile2_1)
        block.x = i * GRID_WIDTH
        block.y = j * GRID_HEIGHT
        this.map[i][j] = block
        this.addChild(block)
      }
    }

    this.sortChildren()

  }

  onCreateBubble(x: number, y: number, style: TBubbleStyle, power: number) {
    if (this.bubbles.some(item => item.gridX == x && item.gridY == y)) {
      return
    }

    const bubble = new Bubble(bubbleFactory()[style], x, y, power)
    bubble.zIndex = 1

    this.addChild(bubble)
    this.bubbles.push(bubble)

    setTimeout(() => {
      bubble.boom()
      this.bubbles = this.bubbles.filter(item => item != bubble)
    }, 2000)

    this.sortChildren()

  }

  iCanGo(gridX: number, gridY: number): boolean {
    return gridX >= 0 && GRID_WIDTH_SIZE > gridX &&
      gridY >= 0 && GRID_HEIGHT_SIZE > gridY &&
      // this.map[gridX][gridY].canPass &&
      !this.bubbles.some(item => item.gridX == gridX && item.gridY == gridY)
  }

  onUpdate() {

  }
}