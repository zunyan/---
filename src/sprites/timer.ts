import { toNumber } from "@vue/shared";
import { Container, Graphics, utils, Text, TextStyle } from "pixi.js";


export default class Timer extends Container {
    timer: any;
    timeRect: any;
    time: any;
    constructor() {
        super()
        const BOX_WIDHT = 140;
        const BOX_HEIGHT = 30;
        let timeRect = this.timeRect = new Graphics()
        timeRect.lineStyle({
            width: 3,
            color: utils.rgb2hex([0 / 255, 72 / 255, 158 / 255]),
        })
        timeRect.beginFill(utils.rgb2hex([2 / 255, 69 / 255, 144 / 255]))
        timeRect.drawRoundedRect(0, 0, BOX_WIDHT, BOX_HEIGHT, 8)
        //2 69 144
        timeRect.endFill()

        const text = new Text('倒计时间', new TextStyle({
            align: 'center',
            fontSize: 14,
            fill: utils.rgb2hex([122 / 255, 191 / 255, 219 / 255]),
            dropShadow: true,
            dropShadowAlpha: 0.7,
            dropShadowBlur: 3,
            letterSpacing: 1
        }))
        //122 191 219
        text.x = 10
        text.y = timeRect.height / 2 - text.height / 2

        timeRect.addChild(text)

        let timeSeconds = 300
        
        clearInterval(this.timer)
        this.timer = setInterval(() => {
            if (timeSeconds < 1) {
                clearInterval(this.timer)
            }
            timeRect.removeChild(this.time)
            let m = Math.floor(timeSeconds / 60)
            let s = timeSeconds % 60
            let mm = m < 10 ? '0' + m : m
            let ss = s < 10 ? '0' + s : s
            let timeStr = mm + ':' + ss
            const time = this.time = new Text(timeStr, new TextStyle({
                align: 'center',
                fontSize: 14,
                fill: utils.rgb2hex([235 / 255, 174 / 255, 23 / 255]),
                dropShadow: true,
                dropShadowAlpha: 0.7,
                dropShadowBlur: 3,
                letterSpacing: 1
            }))
            timeRect.addChild(time)
            time.x = text.width + 15
            time.y = timeRect.height / 2 - text.height / 2
            timeSeconds -= 1
        }, 1000)
        this.addChild(timeRect)
    }
}