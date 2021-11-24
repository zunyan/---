import { Graphics, Text, utils, TextStyle } from "pixi.js";
import dayjs, { Dayjs } from "dayjs";
export default class MessageBox extends Graphics {
  texts: Text[] = []
  boxHeight: number;
  constructor(width: number, height: number, hex: number = 0x000, alpha: number = 0.2) {
    super()

    this.beginFill(hex, alpha)
    this.drawRoundedRect(0, 0, width, height, 4)
    this.endFill()
    this.boxHeight = height;

    const mask = new Graphics()
    mask.beginFill(0xffffff)
    mask.drawRoundedRect(0, 0, width, height, 4)
    mask.endFill()
    this.mask = mask
    this.addChild(mask)
  }

  push(msg: string) {
    const text = new Text(`[${dayjs().format('HH:MM:ss')}] ${msg}`, new TextStyle({
      align: 'left',
      fontSize: 14,
      wordWrapWidth: this.width - 8,
      wordWrap: true,
      breakWords: true,
      fill: utils.rgb2hex([255 / 255, 255 / 255, 255 / 255]),
    }))

    text.x = 4
    text.y = 4
    this.addChild(text)
    this.texts.push(text)

    let y = 0
    this.texts = this.texts.filter((item, index) => {
      item.x = 8
      item.y = this.boxHeight - 8 - item.height - y
      y = y + item.height + 4
      item.alpha = (10 - index) / 10

      if (item.y + item.height < 0) {
        item.destroy()
        this.removeChild(item)
        return false
      } else {
        return true
      }
    })
  }
}