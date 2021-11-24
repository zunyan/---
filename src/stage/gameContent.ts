import { Container, DisplayObject, Graphics, Sprite, utils } from "pixi.js";
import { GRID_HEIGHT, GRID_HEIGHT_SIZE, GRID_WIDTH, GRID_WIDTH_SIZE, STAGE_HEIGHT, STAGE_WIDTH, GRID_HEIGHT_BOX, GRID_WIDTH_BOX } from "../constant";
import { MapBlock, TBubbleStyle } from "../global";
import Bubble from "../sprites/bubble";
import Person from "../sprites/person";
import bubbleFactory from "../textureFactory/bubbleFactory";
import mapFactory from "../textureFactory/mapFactory";
import { priateMap } from '../map/pirate'
import textureFactory from "../textureFactory";
import Props from "../sprites/props";

export default class GameContent extends Container {

  person: Person;
  bubbles: Bubble[] = [];
  map: MapBlock[][];
  content: Container;

  constructor(map: MapBlock[][]) {
    super()

    const content = this.content = new Container()
    const mask = new Graphics()
    mask.beginFill(0xFF3300)
    mask.drawRoundedRect(0, 0, GRID_WIDTH * GRID_WIDTH_SIZE, GRID_HEIGHT * GRID_HEIGHT_SIZE, 8)
    mask.endFill()
    content.mask = mask
    content.addChild(mask)
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
          this.addChild(block)
        }
        content.addChild(floor)
      })
    })
    this.map = priateMap;

    this.person = new Person(0, 0)

    this.addChild(this.person)

    document.onkeydown = this.person.handleKeydown.bind(this.person)
    document.onkeyup = this.person.handleKeyup.bind(this.person)

  }

  async onCreateBubble(x: number, y: number, style: TBubbleStyle, power: number) {
    if (this.bubbles.some(item => item.gridX == x && item.gridY == y)) {
      return
    }

    const bubble = new Bubble(bubbleFactory()[style], x, y, power)
    bubble.zIndex = 1
    this.addChild(bubble)
    this.bubbles.push(bubble)

    await new Promise(resolve => setTimeout(resolve, 3500))
    if (this.bubbles.some(item => bubble == item)) {
      this.checkBoomt(bubble)
    }
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
      !this.map[gridY][gridX].top && // 前方没有障碍物 - 可破坏类型
      !this.bubbles.some(item => item.gridX == gridX && item.gridY == gridY) // 没有气泡
  }

  onUpdate() {
    this.person.zIndex = this.person.gridY * 10 + 2
  }
}