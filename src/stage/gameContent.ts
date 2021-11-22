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

export default class GameContent extends Stage {

  person: Person;
  bubbles: Bubble[] = [];
  map: Item[][];

  constructor(map: Item[][]) {
    super()

    map.forEach((item: Item[], index) => {
      item.forEach((_item: Item, _index) => {
        const floor = new Sprite((mapFactory().map_pirate as any)[_item.floor])
        floor.x = _index * GRID_WIDTH
        floor.y = index * GRID_WIDTH
        floor.zIndex = 1

        if(_item.top){
          const block = new Sprite((mapFactory().map_pirate as any)[_item.top])
          block.x = _index * GRID_WIDTH
          block.y = index * GRID_WIDTH
          block.zIndex = index + 1
          this.addChild(block)
        }
        this.addChild(floor)
      })
    })

    this.map = priateMap;

    this.person = new Person(20, 10)

    this.person.interactive = true
    this.person.on('click', () => {
      app.back()
    })
    this.addChild(this.person)

    document.onkeydown = this.person.handleKeydown.bind(this.person)
    document.onkeyup = this.person.handleKeyup.bind(this.person)

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
    console.info(this.map[gridY][gridX].type, gridX, gridY, this.map)
    return gridX >= 0 && GRID_WIDTH_SIZE > gridX &&
      gridY >= 0 && GRID_HEIGHT_SIZE > gridY &&
      !this.map[gridY][gridX].type &&
      !this.bubbles.some(item => item.gridX == gridX && item.gridY == gridY)
  }

  onUpdate(){
    this.person.zIndex = this.person.gridY + 1

  }
}