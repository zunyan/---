import Stage from "./stage";
import socket from '../socket'
import { HALL_SOCKET_URL, STAGE_HEIGHT, STAGE_WIDTH } from "../constant";
import store from "../store";
import { Graphics, Container, Loader, Sprite } from "pixi.js";
import app from "../app";
import RoomStage from "./room";
import UIButton from "../sprites/UIButton";
import { COMMON_TEXTURE } from "../COMMON";
import btnFactory from "../textureFactory/btnfactory";
import RoomCard from "../sprites/roomCard";
import { TRoom, TRoomStatus } from "../global";
import MessageBox from "../sprites/messageBox";

export default class HallStage extends Stage {
  io: any;
  roomList: TRoom[] = []
  timer: number | undefined;
  roomListBox: Container;
  pageNum: number = 0
  messageBox: MessageBox;

  constructor() {
    super()
    this.background = 0x268ed8;
    this.backgroundImage = Loader.shared.resources[COMMON_TEXTURE["hall.png"]].texture

    const createRoomBtn = new UIButton("创建房间", 120, 60)
    createRoomBtn.x = STAGE_WIDTH - createRoomBtn.width - 25
    createRoomBtn.y = 22
    createRoomBtn.on('click', this.handleOnCreateRoom.bind(this))
    this.addChild(createRoomBtn)

    const box1 = new Graphics()
    box1.lineStyle({
      color: 0x000,
      alpha: .25,
      width: 1
    })
    box1.beginFill(0x000000, 0.2);
    box1.drawRoundedRect(0, 0, 760, 340, 4)
    box1.endFill()
    box1.lineStyle({
      color: 0x000,
      alpha: .30,
      width: 1
    })
    box1.beginFill(0x000000, 0.3);
    box1.drawRoundedRect(15, 15, 730, 275, 4)
    box1.endFill()
    box1.x = STAGE_WIDTH / 2 - box1.width / 2
    box1.y = 95
    this.addChild(box1)

    const btnbar = new Container()
    const prePageBtn = new Sprite(btnFactory().btn_pre_page)
    prePageBtn.interactive = true
    prePageBtn.on("click", this.prePage.bind(this))
    btnbar.addChild(prePageBtn)

    const nextPageBtn = new Sprite(btnFactory().btn_next_page)
    nextPageBtn.interactive = true
    nextPageBtn.on("click", this.nextPage.bind(this))
    nextPageBtn.x = prePageBtn.width + 10
    btnbar.addChild(nextPageBtn)
    btnbar.x = STAGE_WIDTH / 2 - btnbar.width / 2
    btnbar.y = 400
    this.addChild(btnbar)

    this.roomListBox = new Container()
    this.roomListBox.x = 45
    this.roomListBox.y = 115
    this.addChild(this.roomListBox)

    this.messageBox = new MessageBox(760, 110)
    this.messageBox.x = STAGE_WIDTH / 2 - this.messageBox.width / 2
    this.messageBox.y = STAGE_HEIGHT - this.messageBox.height - 40
    this.addChild(this.messageBox)
  }

  handleOnCreateRoom() {
    const name = prompt('请输入房间名称')
    if (name) {
      this.io.emit('createRoom', name, (room: TRoom) => {
        console.info('创建成功', room)
        store.roomId = room.id
        app.push(RoomStage)
      })
    }
  }

  queryRoom() {
    this.io.emit('getRoomList', (roomList: TRoom[]) => {
      this.roomList = roomList
      this.rerenderRoomList()

      this.timer = setTimeout(() => {
        this.queryRoom()
      }, 2000)
    })
  }

  prePage() {
    if (this.pageNum == 0) {
      return
    }
    this.pageNum--
    this.rerenderRoomList()
  }

  nextPage() {
    if (Math.floor(this.roomList.length / 6) == this.pageNum) {
      return
    }
    this.pageNum++
    this.rerenderRoomList()
  }


  onEnter() {
    this.io = socket(HALL_SOCKET_URL, {
      query: {
        username: store.name,
      },
      transports: ['websocket'],
      forceNew: true
    })

    this.io.on('message', (msg: string) => {
      console.info("message=>", msg)
      this.messageBox.push(msg)
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

  async rerenderRoomList() {
    this.roomListBox.removeChildren()

    this.pageNum = Math.min(this.pageNum, Math.floor(this.roomList.length / 6))

    this.roomList.slice(this.pageNum * 6, (this.pageNum + 1) * 6).forEach((item, index) => {

      const card = new RoomCard(item.id, item.name, item.status)
      card.x = index % 3 * (card.width + 8)
      card.y = Math.floor(index / 3) * (card.height + 8)
      card.on('click', () => {
        store.roomId = item.id
        app.push(RoomStage)
      })

      this.roomListBox.addChild(card)

    })
  }

}