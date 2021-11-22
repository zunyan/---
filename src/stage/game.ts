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
import GameContent from "./gameContent";

export default class GameStage extends Stage {

  person: any;
  bubbles: Bubble[] = [];
  map: Item[][];

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
    this.addChild(box1)

    const content = new GameContent(priateMap)
    content.x = 28
    content.y = 105
    this.addChild(content)

    // timer
    const timer = new Timer()
    timer.x = 100
    this.addChild(timer)

    // playerlist
    const list = new PlayerList()
    this.addChild(list);
  //   //
  // }

  }
}