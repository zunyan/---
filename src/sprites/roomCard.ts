import { Graphics, Loader, Sprite, TextStyle, Text, utils } from "pixi.js";
import { COMMON_TEXTURE } from "../COMMON";
import { TRoomStatus } from "../global.d";

export default class RoomCard extends Sprite {
    statusSprite: Sprite | undefined;
    roomId: string;
    constructor(roomId: string, title: string, status: TRoomStatus) {
        super(Loader.shared.resources[COMMON_TEXTURE.room_card_bg].texture)

        this.roomId = roomId
        const g = new Graphics()
        g.lineStyle({
            color: 0x008ac5,
            width: 2
        })
        g.beginFill(0x0594e0)
        g.drawRoundedRect(0, 0, 110, 40, 4)
        g.endFill()
        g.x = 110
        g.y = 18

        this.addChild(g)

        const text = new Text(title, new TextStyle({
            align: 'left',
            fontSize: 14,
            wordWrapWidth: g.width - 8,
            wordWrap: true,
            breakWords: true,
            fill: utils.rgb2hex([255 / 255, 255 / 255, 255 / 255]),
        }))

        text.x = 4
        text.y = 4
        g.addChild(text)

        const img = new Sprite(Loader.shared.resources[COMMON_TEXTURE.room_card_default_img].texture)
        img.x = 10
        img.y = 15
        this.addChild(img)

        this.interactive = true
        this.cacheAsBitmap = true

        this.roomStatus = status
    }

    set roomStatus(status: TRoomStatus){
        const texture = {
            [TRoomStatus.IN_GAME]: Loader.shared.resources[COMMON_TEXTURE.room_card_status_in_game].texture,
            [TRoomStatus.WAITING]: Loader.shared.resources[COMMON_TEXTURE.room_card_status_waiting].texture,
        }[status]
        if(this.statusSprite){
            this.statusSprite.texture = <any>texture
        }else{
            this.statusSprite = new Sprite(texture)
            this.statusSprite.x = 110
            this.statusSprite.y = 80
            this.addChild(this.statusSprite)
        }
    }
}