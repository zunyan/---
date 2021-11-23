import { Container, Texture, Graphics, utils, Text, TextStyle, Sprite } from "pixi.js";

interface Player {
  name: string,
  icon: Texture,
  status: 'ALIVE' | 'DEAD'
}
export default class PlayerList extends Sprite {
  constructor(players: Player[]) {
    super()
    
    const BOX_WIDHT = 200;
    const BOX_HEIGHT = 80;
    const SMALL_BOX_WIDTH = 70;
    const SMALL_BOX_HEIGHT = 60;

    players.forEach((item, index) => {

      const bigRect = new Graphics()
      bigRect.lineStyle({
        width: 3,
        color: utils.rgb2hex([0 / 255, 67 / 255, 134 / 255]),
      })
      bigRect.beginFill(utils.rgb2hex([7 / 255, 101 / 255, 199 / 255]))
      bigRect.drawRoundedRect(0, 0, BOX_WIDHT, BOX_HEIGHT, 8)
      bigRect.endFill()

      bigRect.lineStyle({
        width: 3,
        color: utils.rgb2hex([52 / 255, 169 / 255, 189 / 255]),
      })
      bigRect.beginFill(utils.rgb2hex([1 / 255, 58 / 255, 102 / 255]))
      bigRect.drawRoundedRect(10, 10, SMALL_BOX_WIDTH, SMALL_BOX_HEIGHT, 8)
      bigRect.endFill()

      const icon = new Sprite(item.icon)
      icon.x = 10
      icon.y = 10
      icon.width = SMALL_BOX_WIDTH - 4
      icon.height = SMALL_BOX_HEIGHT - 4
      bigRect.addChild(icon)

      const nameText = new Text(item.name, new TextStyle({
        align: 'center',
        fontSize: 16,
        fill: 0xffffff,
        dropShadow: true,
        dropShadowAlpha: 0.7,
        dropShadowBlur: 3,
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