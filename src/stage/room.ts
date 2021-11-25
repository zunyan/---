import Stage from "./stage";
import socket from '../socket'
import { HALL_SOCKET_URL, ROOM_SOCKET_URL, STAGE_HEIGHT, STAGE_WIDTH } from "../constant";
import store from "../store";
import { Graphics, TextStyle, Text, Loader, Sprite, IDestroyOptions } from "pixi.js";
import UIButton from "../sprites/UIButton";
import app from "../app";
import MessageBox from "../sprites/messageBox";
import { COMMON_TEXTURE } from "../COMMON";
import RoleSelector from "../sprites/roleSelector";
import { TRoleEnum } from "../textureFactory/roleFactory";
import { TPlayerStatus, TRoom, TPlayer } from "../global.d";
import PlayerCard from "../sprites/playerCard";
import UITextureButton from "../sprites/UITextureButton";
import UIUtils from "../UIUtils";
import GameStage from "./game";


export default class RoomStage extends Stage {
  io: any;
  messageBox: MessageBox;
  starBtn: UITextureButton;
  roomInfo: TRoom | undefined;
  me: TPlayer | undefined;

  constructor() {
    super()
    const createRoomBtn = new UIButton("离开房间", 120, 60)
    createRoomBtn.x = STAGE_WIDTH - createRoomBtn.width - 25
    createRoomBtn.y = 22
    createRoomBtn.on('click', this.handleOnLeaveRoom.bind(this))
    this.addChild(createRoomBtn)

    this.background = 0x1382f6

    const g = new Graphics()
    const fastDrawRoundedRect = (x: number, y: number, width: number, height: number, color: number, fill: number, round: number) => {
      g.lineStyle({ color: color, width: 1 })
      g.beginFill(fill)
      g.drawRoundedRect(x, y, width, height, round);
      g.endFill()
    }

    fastDrawRoundedRect(5, -10, 455, 40, 0x0d3d7f, 0x0b44b6, 8)
    fastDrawRoundedRect(5, 35, 510, 515, 0x0d3d7f, 0x02c1f5, 8)
    fastDrawRoundedRect(5 + 1, 35 + 1, 510 - 2, 515 - 2, 0xffffff, 0x02c1f5, 8)
    fastDrawRoundedRect(465, 5, 328, 555, 0x0d3d7f, 0x066ac8, 8)
    fastDrawRoundedRect(465 + 1, 5 + 1, 328 - 2, 555 - 2, 0x3e8ec9, 0x066ac8, 8)
    fastDrawRoundedRect(0, STAGE_HEIGHT - 35, 800, 35, 0x0d3d7f, 0x073d85, 0)
    fastDrawRoundedRect(-1, STAGE_HEIGHT - 35 + 1, 800 + 2, 35, 0x1a65b6, 0x073d85, 0)
    fastDrawRoundedRect(480, 240, 300, 215, 0x0d3d7f, 0x0050ac, 8)
    fastDrawRoundedRect(22, 55, 426, 30, 0x0475a9, 0x0091d4, 4)
    fastDrawRoundedRect(20, 90, 430, 295, 0x3fe0ff, 0x044795, 4)
    // fastDrawRoundedRect(5, -10, 455, 40, 0x0d3d7f, 0x0b44b6, 8)
    // fastDrawRoundedRect(5, -10, 455, 40, 0x0d3d7f, 0x0b44b6, 8)
    // fastDrawRoundedRect(5, -10, 455, 40, 0x0d3d7f, 0x0b44b6, 8)

    this.addChild(g)

    const img = new Sprite(Loader.shared.resources[COMMON_TEXTURE.bg].texture)
    img.x = 480
    img.y = 15
    img.width = 300
    img.height = 210
    this.addChild(img)

    this.messageBox = new MessageBox(430, 148, 0x0050a9, 1)
    this.messageBox.x = 20
    this.messageBox.y = 390
    this.addChild(this.messageBox)

    const startBtn = this.starBtn = new UITextureButton(Loader.shared.resources[COMMON_TEXTURE.btn_room_ready].texture)
    startBtn.x = 535
    startBtn.y = 480
    startBtn.on('click', this.handleOnStartBtnClick.bind(this))
    this.addChild(startBtn)

    const roleSelector = new RoleSelector()
    roleSelector.x = 488
    roleSelector.y = 250
    roleSelector.onSelected((v: TRoleEnum) => {
      this.io.emit('choosePlayer', v, () => { })
    })
    this.addChild(roleSelector)
  }

  handleOnStartBtnClick() {
    if (!this.me || !this.roomInfo) {
      return
    }

    if (this.me.isMaster) {
      if (this.roomInfo.players.some(item => item.status == TPlayerStatus.PENDING && !item.isMaster)) {
        // 还有玩家没准备好
        UIUtils.toast("还有玩家未准备")
      } else {
        this.io.emit("start", undefined, () => null)
      }
    } else {
      this.io.emit("ready", undefined, () => null)
    }
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
      this.messageBox.push(msg)
    })

    this.io.on('disconnect', () => {
      // app.back()
    })

    this.io.on("gameStart", () => {
      app.push(GameStage)
    })

    return Stage.prototype.onEnter.call(this)
  }

  sync(room: TRoom) {
    this.roomInfo = room
    console.info(room)
    this.renderRoomName(room)
    this.renderPlayCard(room)

    const me = this.me = room.players.find(item => item.name == store.name)
    if (!me) {
      app.back()
    }

    if (me?.isMaster) {
      this.starBtn.baseTexture = this.starBtn.texture =
        <any>Loader.shared.resources[COMMON_TEXTURE.btn_room_start].texture
    }
  }

  getSyncPack(): Promise<TRoom> {
    return new Promise(resolve => {
      this.io.once('sync', resolve)
    })
  }

  async loop() {
    const first = await this.getSyncPack()
    // 第一次，进行变量的初始化


    while (1) {

    }



    const room: TRoom = await new Promise(resolve => {
      this.io.once('sync', resolve)
    })
  }

  renderRoomName(room: TRoom) {
    const name = new Text(room.name, new TextStyle({
      align: 'center',
      fontSize: 12,
      fill: '#fff'
    }))
    name.x = 30
    name.y = 63
    name.zIndex = 10
    this.addChild(name)
  }

  renderPlayCard(room: TRoom) {
    for (let i = 0; i < 8; i++) {
      const player = new PlayerCard(i < room.totalPlayer, room.players[i])
      player.x = 25 + i % 4 * (player.width + 4)
      player.y = Math.floor(i / 4) * player.height + 92
      this.addChild(player)
    }
  }

  onLeave() {
    this.io.close()
    return Stage.prototype.onLeave.call(this)
  }
}