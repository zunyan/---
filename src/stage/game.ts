import { Container, DisplayObject, Graphics, Rectangle, Sprite, utils } from "pixi.js";
import { GRID_HEIGHT, GRID_HEIGHT_SIZE, GRID_WIDTH, GRID_WIDTH_SIZE, STAGE_HEIGHT, STAGE_WIDTH, GRID_HEIGHT_BOX, GRID_WIDTH_BOX, ROOM_SOCKET_URL, GAME_SOCKET_URL } from "../constant";
import Bubble from "../sprites/bubble";
import bubbleFactory from "../textureFactory/bubbleFactory";
import Stage from "./stage";
import PlayerList from "../sprites/playerList";
import Timer from "../sprites/timer";
import { priateMap } from '../map/pirate'
import store from "../store";
import socket from "../socket";
import app from "../app";
import { MapBlock, TBubbleStyle, TGameBoomBubble, TGameBox, TGameBubble, TGameInfo, TGamePlayer, TGamePlayerMoveTarget } from "../global.d";
import Person from "../sprites/person";
import Props from "../sprites/props";
import mapFactory from "../textureFactory/mapFactory";

export default class GameStage extends Stage {

  io: any;


  //   // // 道具栏
  //   // const toolBar = new Graphics()
  //   // toolBar.lineStyle({
  //   //   width: 1,
  //   //   color: 0x00489c
  //   // })
  //   // toolBar.beginFill(0x0095ef)
  //   // toolBar.drawRoundedRect(0, 0, 350, 50, 14)
  //   // toolBar.endFill()
  //   // toolBar.x = 150
  //   // toolBar.y = this.height - 38
  //   // this.addChild(toolBar)


  bubbles: Bubble[] = [];
  map: MapBlock[][];
  content: Container;
  persons: Person[] = [];
  me: Person | undefined;

  constructor() {
    super()

    this.background = 0x0a5fb9;

    const g = new Graphics()
    const fastDrawRoundedRect = (x: number, y: number, width: number, height: number, color: number, fill: number, round: number) => {
      g.lineStyle({ color: color, width: 1 })
      g.beginFill(fill)
      g.drawRoundedRect(x, y, width, height, round);
      g.endFill()
    }

    fastDrawRoundedRect(
      0, 0, GRID_WIDTH_BOX * GRID_WIDTH + 20, GRID_HEIGHT_BOX * GRID_WIDTH + 20,
      0x327bb2, 0x000000, 8
    )
    fastDrawRoundedRect(
      5, 5, GRID_WIDTH_BOX * GRID_WIDTH + 10, GRID_HEIGHT_BOX * GRID_WIDTH + 10,
      0x44414a, 0x696772, 8
    )
    fastDrawRoundedRect(
      10, 10, GRID_WIDTH_BOX * GRID_WIDTH, GRID_HEIGHT_BOX * GRID_WIDTH,
      0x44414a, 0x000, 8
    )
    g.x = 10
    g.y = 35
    this.addChild(g)

    const leftBar = new Graphics()
    leftBar.lineStyle({
      color: 0x004a93,
      width: 1
    })
    leftBar.beginFill(0x027ed8)
    leftBar.drawRoundedRect(0, 0, 155, 540, 8)
    leftBar.endFill()
    leftBar.x = 638
    leftBar.y = 35
    this.addChild(leftBar)
    // timer
    const timer = new Timer()

    timer.x = 645
    timer.y = 45
    this.addChild(timer)

    const map = priateMap
    const mapLayer = new Container()
    const mask = new Graphics()
    mask.beginFill(0xFF3300)
    mask.drawRoundedRect(0, 0, GRID_WIDTH * GRID_WIDTH_SIZE, GRID_HEIGHT * GRID_HEIGHT_SIZE, 8)
    mask.endFill()
    mapLayer.mask = mask
    mapLayer.x = 20
    mapLayer.y = 45
    mapLayer.addChild(mask)
    this.addChild(mapLayer)

    const content = this.content = new Container()
    content.x = 20
    content.y = 45
    this.addChild(content)

    map.forEach((item: MapBlock[], index) => {
      item.forEach((_item: MapBlock, _index) => {
        const floor = new Sprite((mapFactory().map_pirate as any)[_item.floor])
        floor.x = _index * GRID_WIDTH
        floor.y = index * GRID_WIDTH + GRID_WIDTH
        floor.zIndex = 0
        if (_item.top) {
          const block = new Sprite((mapFactory().map_pirate as any)[_item.top])
          block.x = _index * GRID_WIDTH
          block.y = index * GRID_WIDTH + GRID_WIDTH
          block.zIndex = index * 10 + 1
          _item.block = block
          content.addChild(block)
        }

        mapLayer.addChild(floor)
      })
    })
    this.map = priateMap;
  }

  async onCreateBubble(gridx: number, gridy: number, style: TBubbleStyle, power: number) {

    if (this.bubbles.some(item => item.gridX == gridx && item.gridY == gridy)) {
      return
    }

    this.io.emit("putBubbles", null, () => null)

    // const bubble = new Bubble(bubbleFactory()[style], x, y, power)
    // bubble.zIndex = 1
    // this.addChild(bubble)
    // this.bubbles.push(bubble)

    // await new Promise(resolve => setTimeout(resolve, 3500))
    // if (this.bubbles.some(item => bubble == item)) {
    //   this.checkBoomt(bubble)
    // }
  }

  async checkBoomt(bubble: Bubble) {

    const todoList: Bubble[] = [bubble]
    const destoryBox: MapBlock[] = []
    const boomBubbles: {
      bubble: Bubble,
      left: number,
      right: number,
      top: number,
      bottom: number
    }[] = []

    while (1) {
      const item = todoList.shift()
      let left = 0, right = 0, top = 0, bottom = 0
      if (!item) {
        break
      }
      const { gridX, gridY } = item

      // 往右寻找
      while (1) {
        // 地图出界
        if (gridX + right + 1 == GRID_WIDTH_SIZE) {
          break
        }

        // 障碍物判断
        const nextItem = this.map[gridY][gridX + right + 1]
        if (nextItem) {
          if (destoryBox.some(item => item == nextItem)) {
            break
          } else if (nextItem.type) {
            break
          } else if (nextItem.top) {
            destoryBox.push(nextItem)
            right++
            break
          }
        }

        const bubble = this.bubbles.find(item => item.gridX == gridX + right + 1 && item.gridY == gridY)
        if (bubble && !boomBubbles.some(item => item.bubble == bubble)) {
          todoList.push(bubble)
        }

        // 球判断

        right++
        if (right == item.power) {
          break
        }
      }
      // 往左寻找
      while (1) {

        const newGridX = gridX - left - 1
        const newGridY = gridY

        // 地图出界
        if (newGridX < 0) {
          break
        }

        // 障碍物判断
        const nextItem = this.map[newGridY][newGridX]
        if (nextItem) {
          if (destoryBox.some(item => item == nextItem)) {
            break
          } else if (nextItem.type) {
            break
          } else if (nextItem.top) {
            destoryBox.push(nextItem)
            left++
            break
          }
        }

        const bubble = this.bubbles.find(item => item.gridX == newGridX && item.gridY == newGridY)
        if (bubble && !boomBubbles.some(item => item.bubble == bubble)) {
          todoList.push(bubble)
        }

        // 球判断

        left++
        if (left == item.power) {
          break
        }
      }
      // 往上寻找
      while (1) {

        const newGridX = gridX
        const newGridY = gridY - top - 1

        // 地图出界
        if (newGridY < 0) {
          break
        }

        // 障碍物判断
        const nextItem = this.map[newGridY][newGridX]
        if (nextItem) {
          if (destoryBox.some(item => item == nextItem)) {
            break
          } else if (nextItem.type) {
            break
          } else if (nextItem.top) {
            destoryBox.push(nextItem)
            top--
            break
          }
        }

        const bubble = this.bubbles.find(item => item.gridX == newGridX && item.gridY == newGridY)
        if (bubble && !boomBubbles.some(item => item.bubble == bubble)) {
          todoList.push(bubble)
        }

        top++
        if (top == item.power) {
          break
        }
      }
      // 往下寻找
      while (1) {

        const newGridX = gridX
        const newGridY = gridY + bottom + 1

        // 地图出界
        if (newGridY == GRID_HEIGHT_SIZE) {
          break
        }

        // 障碍物判断
        const nextItem = this.map[newGridY][newGridX]
        if (nextItem) {
          if (destoryBox.some(item => item == nextItem)) {
            break
          } else if (nextItem.type) {
            break
          } else if (nextItem.top) {
            destoryBox.push(nextItem)
            bottom++
            break
          }
        }

        const bubble = this.bubbles.find(item => item.gridX == newGridX && item.gridY == newGridY)
        if (bubble && !boomBubbles.some(item => item.bubble == bubble)) {
          todoList.push(bubble)
        }

        bottom++
        if (bottom == item.power) {
          break
        }
      }

      boomBubbles.push({
        bubble: item,
        left,
        right,
        top,
        bottom
      })

    }

    destoryBox.forEach(item => {

      if (!item.block) {
        return
      }
      item.top = ""
      item.block?.parent.removeChild(item.block)

      if (item.prop) {
        const props = new Props(item.prop)
        props.x = item.block.x
        props.y = item.block.y
        this.addChild(props)
      }
    })

    boomBubbles.forEach(item => {
      const { bubble, left, right, top, bottom } = item;
      bubble.boom(left, right, top, bottom)
      this.bubbles = this.bubbles.filter(_ => bubble != _)
    })
  }

  iCanGo(gridX: number, gridY: number, x: number, y: number): boolean {
    return true &&
      gridX >= 0 && GRID_WIDTH_SIZE > gridX && // 不超过屏幕尺寸
      gridY >= 0 && GRID_HEIGHT_SIZE > gridY && // 不超过屏幕尺寸
      !this.map[gridY][gridX].type && // 前方没有障碍物 - 不可破坏类型
      !this.map[gridY][gridX].block && // 前方没有障碍物 - 可破坏类型
      !this.bubbles.some(item => item.gridX == gridX && item.gridY == gridY) // 没有气泡
  }

  onUpdate() {
    this.persons.forEach(person => {
      person.zIndex = person.gridY * 10 + 2
    })
  }

  onEnter() {
    this.io = new socket(GAME_SOCKET_URL, {
      query: {
        username: store.name,
        roomId: store.roomId,
      },
      transports: ['websocket'],
      forceNew: true
    })

    this.loop()

    this.io.on('disconnect', () => {
      // app.back()
    })

    this.io.on('boomBubble', (booms: TGameBoomBubble[]) => {
      booms.forEach(bub => {
        const bubble = new Bubble(bubbleFactory()['RANBOW'], bub.gridX, bub.gridY, 1)
        bubble.zIndex = 1
        this.content.addChild(bubble)
        bubble.boom(bub.left, bub.right, bub.top, bub.bottom)
      })
    })

    return Stage.prototype.onEnter.call(this)
  }

  onLeave() {
    this.io.close()
    return Stage.prototype.onLeave.call(this)
  }

  getSyncPack(): Promise<TGameInfo> {
    return new Promise(resolve => {
      this.io.once('sync', resolve)
    })
  }

  async loop() {
    const first = await this.getSyncPack()

    // 创建玩家列表
    const list = new PlayerList(
      first.players.map(item => {
        return {
          name: item.name,
          icon: bubbleFactory().BLACK[0],
          status: item.status
        }
      })
    )
    list.x = 645
    list.y = 85
    this.addChild(list);

    const persons = this.persons = first.players.map(item => {
      const person = new Person(item.gridX, item.gridY, item.name, item.role)
      this.content.addChild(person)
      if (store.name == item.name) {
        this.me = person
        document.onkeydown = person.handleKeydown.bind(person)
        document.onkeyup = person.handleKeyup.bind(person)
        setInterval(() => {
          person.hasChange && this.io.emit("changeprop", <TGamePlayer>{
            name: store.name,
            gridX: person.gridX,
            gridY: person.gridY,
            x: person.x,
            y: person.y,
            moveTarget: person.moveTarget
          })

          person.hasChange = false
        }, 30)
      }

      return person
    })

    // 进行地图数据的组装
    first.props.forEach(item => {
      this.map[item.gridY][item.gridX].prop = item.props
    })

    while (1) {
      const pack = await this.getSyncPack()
      pack.players.forEach((item, index) => {
        if (store.name != item.name) {
          persons[index].x = item.x
          persons[index].y = item.y
          persons[index].gridX = item.gridX
          persons[index].gridY = item.gridY
          persons[index].moveTarget = item.moveTarget
        }
      })

      // 将服务端返回的泡泡进行map转换
      const map2: { [x: string]: TGameBubble } = {}
      for (let i of pack.bubbles) {
        const uuid = `${i.gridX}_${i.gridY}`
        map2[uuid] = i
      }

      // 对本地的泡泡进行处理，将已经不存在的泡泡删除掉
      const map: { [x: string]: Bubble } = {}
      this.bubbles = this.bubbles.filter(item => {
        const uuid = `${item.gridX}_${item.gridY}`
        map[uuid] = item
        if (map2[uuid]) {
          return true
        } else {
          item.parent.removeChild(item)
          return false
        }
      })

      pack.bubbles.forEach(bub => {
        const uuid = `${bub.gridX}_${bub.gridY}`
        if (map[uuid]) {
          // 已经存在，不处理
          return
        } else {
          const bubble = new Bubble(bubbleFactory()['RANBOW'], bub.gridX, bub.gridY, bub.power)
          bubble.zIndex = 1
          this.content.addChild(bubble)
          this.bubbles.push(bubble)
        }
      })

      // 
      const boxMap: { [x: string]: TGameBox } = {}
      pack.props.forEach(item => {
        boxMap[`${item.gridX}_${item.gridY}`] = item
      })
      this.map.forEach((line, gridY) => {
        line.forEach((item, gridX) => {
          const key = `${gridX}_${gridY}`
          if (boxMap[key]) {

          } else if (item.block) {
            item.block.parent.removeChild(item.block)
            item.block = undefined
          }
        })
      })
    }
  }
}