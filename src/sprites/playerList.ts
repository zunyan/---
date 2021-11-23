import { Container, Texture, Graphics, utils, Text, TextStyle, Sprite } from "pixi.js";

interface Player {
  name: string,
  icon: Texture,
  status: 'ALIVE' | 'DEAD'
}
export default class PlayerList extends Sprite {
  constructor(players: Player[]) {
    super()
    
    const BOX_WIDHT = 140;
    const BOX_HEIGHT = 40;
    const SMALL_BOX_WIDTH = 38;
    const SMALL_BOX_HEIGHT = 30;

    players.forEach((item, index) => {

      const bigRect = new Graphics()
      bigRect.lineStyle({
        width: 1,
        color: 0x0042a0,
      })
      bigRect.beginFill(0x0765c7)
      bigRect.drawRoundedRect(0, 0, BOX_WIDHT, BOX_HEIGHT, 3)
      bigRect.endFill()

      bigRect.lineStyle({
        width: 2,
        color: 0x1b76cf,
      })
      bigRect.beginFill(0x003c94)
      bigRect.drawRoundedRect(5, 5, SMALL_BOX_WIDTH, SMALL_BOX_HEIGHT, 3)
      bigRect.endFill()

      const icon = new Sprite(item.icon)
      icon.x = 5
      icon.y = 5
      icon.width = SMALL_BOX_WIDTH - 4
      icon.height = SMALL_BOX_HEIGHT - 4
    //   bigRect.addChild(icon)

      const nameText = new Text(item.name, new TextStyle({
        align: 'center',
        fontSize: 12,
        fill: 0xffffff,
        letterSpacing: 1
      }))

      nameText.x = SMALL_BOX_WIDTH + 10 + 10
      nameText.y = BOX_HEIGHT / 2 - nameText.height / 2

      bigRect.addChild(nameText)

      bigRect.y = (BOX_HEIGHT + 8) * index

      this.addChild(bigRect)
    });

  }
}