import { DisplayObject, Graphics } from "pixi.js";
import app from "../app";
import { GRID_HEIGHT, GRID_HEIGHT_SIZE, GRID_WIDTH, GRID_WIDTH_SIZE, STAGE_HEIGHT, STAGE_WIDTH } from "../constant";
import { TBubbleStyle } from "../global";
import Block from "../sprites/block";
import Bubble from "../sprites/bubble";
import Person from "../sprites/person";
import bubbleFactory from "../textureFactory/bubbleFactory";
import mapFactory from "../textureFactory/mapFactory";
import Stage from "./stage";
import * as TWEEN from '@tweenjs/tween.js'
import PlayerList from "../sprites/playerList";
import Timer from "../sprites/timer";

export default class GameStage extends Stage {

  person: any;
  bubbles: Bubble[] = [];
  map: Block[][] = [];

  constructor() {
    super()

    // 渲染框架
    // timer
    const timer = new Timer()

    timer.x = 100
    timer.y = 45
    this.addChild(timer)

    // playerlist
    const list = new PlayerList([{
      name: "name1",
      icon: bubbleFactory().BLACK[0],
      status: 'ALIVE'
    },{
      name: "name2",
      icon: bubbleFactory().RED[0],
      status: 'ALIVE'
    }])
    list.x = 100
    list.y = 100
    this.addChild(list);
    //
  }

  temp() {
    this.drawMap()

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
      this.map[gridX][gridY].canPass &&
      !this.bubbles.some(item => item.gridX == gridX && item.gridY == gridY)
  }

  onUpdate() {

  }
}