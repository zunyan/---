import { Container } from "@pixi/display";
import { Sprite } from "@pixi/sprite";
import { TextStyle, utils, Text } from "pixi.js";
import { TPlayer, TPlayerStatus } from "../global.d";
import bazziFactoy from "../textureFactory/bazziFactoy";

import roomFactory from "../textureFactory/roomFactory";

export default class PlayerCard extends Container {
    constructor(isPlay: boolean, player?: TPlayer) {
        super();
        const playerCard = new Sprite(isPlay ? roomFactory().playerCard : roomFactory().playerCardNone);
        this.addChild(playerCard)
        if (player) {
            const readyText = player.isMaster ? '房 主' : '准 备'
            const highlight = player.status == TPlayerStatus.READY || player.isMaster
            const text = new Text(readyText, new TextStyle({
                align: 'center',
                fontSize: 12,
                fill: highlight ? '#fff' : utils.rgb2hex([122 / 255, 191 / 255, 219 / 255]),
            }))
            text.x = (playerCard.width - text.width) / 2
            text.y = 124

            const name = new Text(player.name, new TextStyle({
                align: 'center',
                fontSize: 12,
                fill: '#fff',
            }))
            name.x = (playerCard.width - name.width) / 2
            name.y = 106

            console.log(5555555,player.role)
            const person = new Sprite((roomFactory() as any)[player.role])
            person.x = (playerCard.width - person.width) / 2
            person.y = 20
            this.addChild(person)
            this.addChild(text)
            this.addChild(name)
        }


    }
}