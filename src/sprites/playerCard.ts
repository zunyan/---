import { Container } from "@pixi/display";
import { Sprite } from "@pixi/sprite";
import { TextStyle, utils, Text } from "pixi.js";
import { TPlayer, TPlayerStatus } from "../global.d";
import bazziFactoy from "../textureFactory/bazziFactoy";
import { TRoleEnum } from "../textureFactory/roleFactory";

import roomFactory from "../textureFactory/roomFactory";

export default class PlayerCard extends Container {
    person: Sprite | undefined;
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

            const person = this.person = new Sprite((roomFactory() as any)[player.role])
            person.x = (playerCard.width - person.width) / 2
            person.y = 30

            const shadow =  new Sprite(bazziFactoy().shadow)
            shadow.x = playerCard.width / 2 - shadow.width / 2
            shadow.y = 75
            this.addChild(shadow)
            this.addChild(person)
            this.addChild(text)
            this.addChild(name)
        }
    }
}