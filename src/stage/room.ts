import Stage from "./stage";
import socket from '../socket'
import { HALL_SOCKET_URL, ROOM_SOCKET_URL, STAGE_WIDTH } from "../constant";
import store from "../store";
import { Graphics, TextStyle, utils, Text } from "pixi.js";
import UIButton from "../sprites/UIButton";
import app from "../app";

interface Player {
  name: string
}

interface Room {
  id: string,
  name: string,
  players: Player[],
  totalPlayer: number,
  status: string
}

export default class RoomStage extends Stage {
  io: any;

  constructor() {
    super()
    const createRoomBtn = new UIButton("离开房间", 120, 60)
    createRoomBtn.x = STAGE_WIDTH - createRoomBtn.width - 25
    createRoomBtn.y = 22
    createRoomBtn.on('click', this.handleOnLeaveRoom.bind(this))
    this.addChild(createRoomBtn)
  }

  handleOnLeaveRoom() {
    app.back()
  }

  onEnter() {
    this.io = new socket(ROOM_SOCKET_URL, {
      query: {
        username: store.name,
        roomId: store.roomId,
      },
      transports: ['websocket'],
      forceNew: true
    })

    this.io.on('sync', this.sync.bind(this))
    this.io.on('message', (msg: string) => {
      console.info("message=>", msg)
    })
    return Stage.prototype.onEnter.call(this)
  }

  sync() {

  }

  onLeave() {
    this.io.close()
    return Stage.prototype.onLeave.call(this)
  }
}