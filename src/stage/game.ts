import { DisplayObject, Graphics, Sprite, utils } from "pixi.js";
import app from "../app";
import { GRID_HEIGHT, GRID_HEIGHT_SIZE, GRID_WIDTH, GRID_WIDTH_SIZE, STAGE_HEIGHT, STAGE_WIDTH, GRID_HEIGHT_BOX, GRID_WIDTH_BOX } from "../constant";
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
  map: Item[][] | undefined;

  constructor() {
    super()

    this.background = 0x0a5fb9;
    
    const box1 = new Graphics()
    box1.beginFill(0x000000);
    box1.lineStyle({
      color: 0x327bb2,
      width: 2
    })
    box1.drawRoundedRect(0, 0, GRID_WIDTH_BOX * GRID_WIDTH + 20, GRID_HEIGHT_BOX * GRID_WIDTH + 20, 8)

    box1.beginFill(0x696772);
    box1.lineStyle({
      color: 0x44414a,
      width: 2
    })
    box1.drawRoundedRect(5, 5, GRID_WIDTH_BOX * GRID_WIDTH + 10, GRID_HEIGHT_BOX * GRID_WIDTH + 10, 8)
    box1.endFill()

    box1.lineStyle({
      color: 0x44414a,
      width: 2
    })
    box1.beginFill(0x000);
    box1.drawRoundedRect(10, 10, GRID_WIDTH_BOX * GRID_WIDTH, GRID_HEIGHT_BOX * GRID_WIDTH, 8)
    box1.endFill()
    box1.x = 10
    box1.y = 35
    this.addChild(box1)

    const content = new GameContent(priateMap)
    content.x = 20
    content.y = 45
    this.addChild(content)

    // timer
    const timer = new Timer()

    timer.x = 600
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
    list.x = 600
    list.y = 100
    this.addChild(list);
    //   //
    // }


    // // 道具栏
    // const toolBar = new Graphics()
    // toolBar.lineStyle({
    //   width: 1,
    //   color: 0x00489c
    // })
    // toolBar.beginFill(0x0095ef)
    // toolBar.drawRoundedRect(0, 0, 350, 50, 14)
    // toolBar.endFill()
    // toolBar.x = 150
    // toolBar.y = this.height - 38
    // this.addChild(toolBar)
  }
}