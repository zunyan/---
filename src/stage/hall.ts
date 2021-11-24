import Stage from "./stage";
import socket from '../socket'
import { GRID_HEIGHT_BOX, GRID_WIDTH, GRID_WIDTH_BOX, HALL_SOCKET_URL, STAGE_WIDTH } from "../constant";
import store from "../store";
import { Graphics, TextStyle, utils, Text, Container } from "pixi.js";
import app from "../app";
import RoomStage from "./room";
import UIButton from "../sprites/UIButton";
// (window as any).io = socket;

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

export default class HallStage extends Stage {
  io: any;
  roomList: Room[] = []
  timer: number | undefined;
  roomListBox: Container;

  constructor() {
    super()
    this.background = 0x268ed8;
    const createRoomBtn = new UIButton("创建房间", 120, 60)
    createRoomBtn.x = STAGE_WIDTH - createRoomBtn.width - 25
    createRoomBtn.y = 22
    createRoomBtn.on('click', this.handleOnCreateRoom.bind(this))
    this.addChild(createRoomBtn)

    const box1 = new Graphics()
    box1.beginFill(0x000000);
    box1.lineStyle({
      color: 0x327bb2,
      width: 2
    })
    box1.drawRoundedRect(0, 0, 720 + 20, 390 + 20, 8)

    box1.beginFill(0x696772);
    box1.lineStyle({
      color: 0x44414a,
      width: 2
    })
    box1.drawRoundedRect(5, 5, 720 + 10, 390 + 10, 8)
    box1.endFill()

    box1.lineStyle({
      color: 0x44414a,
      width: 2
    })
    box1.beginFill(0x0a5fb9);
    box1.drawRoundedRect(10, 10, 720, 390, 8)
    box1.endFill()
    box1.x = 30
    box1.y = 100
    this.addChild(box1)

    this.roomListBox = new Container()
    this.roomListBox.x = 45
    this.roomListBox.y = 115
    this.addChild(this.roomListBox)
  }

  handleOnCreateRoom() {
    const name = prompt('请输入房间名称')
    if (name) {
      this.io.emit('createRoom', name, (room: Room) => {
        console.info('创建成功', room)
        store.roomId = room.id
        app.push(RoomStage)
      })
    }
  }

  queryRoom() {
    this.io.emit('getRoomList', (roomList: Room[]) => {
      this.roomList = roomList
      this.rerenderRoomList()

      this.timer = setTimeout(() => {
        this.queryRoom()
      }, 2000)
    })

  }

  onEnter() {
    this.io = socket(HALL_SOCKET_URL, {
      query: {
        username: store.name,
      },
      transports: ['websocket'],
      forceNew: true
    })
    
    this.io.on('message', (msg: string)=>{
      console.info("message=>", msg)
    })

    this.io.on("connect", () => {
      this.queryRoom()
    })

    return Stage.prototype.onEnter.call(this)
  }

  onLeave() {
    clearInterval(this.timer)
    this.roomList = []
    this.io.disconnect()
    return Stage.prototype.onLeave.call(this)
  }

  rerenderRoomList() {
    this.roomListBox.children.forEach(item => {
      this.roomListBox.removeChild(item)
    })

    this.roomList.forEach((item, index) => {
      const g = new Graphics()
      g.beginFill(0x0099ff)
      g.drawRoundedRect(0, 0, 230, 120, 10)
      g.endFill()

      const text = new Text(item.name, new TextStyle({
        align: 'center',
        fontSize: 14,
        fill: utils.rgb2hex([122 / 255, 191 / 255, 219 / 255]),
      }))

      text.x = 10
      g.addChild(text)
      g.interactive = true
      g.x = index % 3 * (g.width + 8)
      g.y = Math.floor(index / 3) * (g.height + 8)
      g.on('click', () => {
        store.roomId = item.id
        app.push(RoomStage)
      })
      this.roomListBox.addChild(g)

    })
  }

}