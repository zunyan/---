import { Application, DisplayObject, Loader } from "pixi.js";
import { STAGE_HEIGHT, STAGE_WIDTH } from "./constant";
import { COMMON_TEXTURE_LIST } from './COMMON';
import GameStage from "./stage/game";
import Stage from "./stage/stage";
import * as TWEEN from '@tweenjs/tween.js'

export default new class App extends Application {

    stack: Stage[] = []

    constructor() {
        super({
            width: STAGE_WIDTH,
            height: STAGE_HEIGHT,
            backgroundColor: 0xffffff
        })

        this.ticker.add(() => {
            const fn = function (obj: any) {
                obj.children.forEach((item: any) => {
                    if (item.onUpdate) {
                        item.onUpdate()
                    }

                    if (item.children.length > 0) {
                        fn(item)
                    }
                })
            }

            fn(this.stage)


            // Setup the animation loop.
            TWEEN.update(performance.now())

        })
    }

    push(stage: any) {

        const _stage = new stage()
        const lastStage = this.stack[this.stack.length - 1]

        if (lastStage) {
            lastStage.onLeave().then(()=>{
                this.stage.removeChild(lastStage)
            })
        }

        this.stack.push(_stage)
        this.stage.addChild(_stage)
        _stage.onEnter()

    }

    back() {
        const lastStack = this.stack.pop()
        if (lastStack) {
            lastStack.onLeave().then(()=>{
                this.stage.removeChild(lastStack)
                lastStack.destroy()
            })
        }

        this.stage.addChild(this.stack[this.stack.length - 1])
        this.stack[this.stack.length - 1].onEnter()
    }

    reselaunch() {
        const lastStack: any = this.stack.pop()
        lastStack.destory()
        this.stage.removeChild(lastStack)

        const stage = new lastStack.__proto__.constructor()
        this.stack.push(stage)
        this.stage.addChild(stage)
        stage.onEnter()
    }

    changeStage(oldStage: Stage | undefined, newStage: Stage) {

        if (oldStage) {
            new TWEEN.Tween(oldStage) // Create a new tween that modifies 'coords'.
                .to(<Partial<DisplayObject>>{ alpha: 0 }, 1000) // Move to (300, 200) in 1 second.
                .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
                .start() // Start the tween immediately.
        }

        newStage.alpha = 0
        new TWEEN.Tween(newStage) // Create a new tween that modifies 'coords'.
            .to(<Partial<DisplayObject>>{ alpha: 1 }, 1000) // Move to (300, 200) in 1 second.
            .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
            .start() // Start the tween immediately.

    }
}