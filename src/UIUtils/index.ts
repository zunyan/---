import { TextStyle, Text, Graphics, Container } from "pixi.js"
import app from "../app"
import { STAGE_HEIGHT, STAGE_WIDTH } from "../constant"
import UILoading from "../sprites/UILoading"

let loadingInst: UILoading | undefined

export default {
    showLoading() {
        loadingInst = new UILoading()
        app.stage.addChild(loadingInst)
    },

    hideLoading() {
        loadingInst && app.stage.removeChild(loadingInst)
    },

    toast(msg: string) {
        const width = 120
        const text = new Text(msg, new TextStyle({
            align: 'left',
            fontSize: 14,
            wordWrapWidth: width - 10,
            wordWrap: true,
            breakWords: true,
            fill: 0xffffff
        }))

        

        const g = new Graphics()
        g.beginFill(0x000, .2)
        g.drawRoundedRect(0, 0, width, text.height + 10, 8)
        
        text.anchor.set(.5, .5)
        text.x = g.width / 2
        text.y = g.height / 2
        g.addChild(text)

        g.x = STAGE_WIDTH / 2 - g.width / 2
        g.y = STAGE_HEIGHT / 2 - g.height / 2

        app.stage.addChild(g)

        setTimeout(()=>{
            app.stage.removeChild(g)
        }, 1500)

    }
}