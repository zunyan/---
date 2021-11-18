import { Container, DisplayObject } from "pixi.js";
import { STAGE_HEIGHT, STAGE_WIDTH } from "../constant";
import * as TWEEN from '@tweenjs/tween.js'

export default class Stage extends Container {

  constructor() {
    super()
    this.onEnter()
  }

  get width() {
    return STAGE_WIDTH
  }

  get height() {
    return STAGE_HEIGHT
  }

  onEnter() {
    this.alpha = 0
    new TWEEN.Tween(this) // Create a new tween that modifies 'coords'.
      .to(<Partial<DisplayObject>>{ alpha: 1 }, 150) // Move to (300, 200) in 1 second.
      .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
      .start() // Start the tween immediately.
  }

  async onLeave() {
    return new Promise(resolve => {
      new TWEEN.Tween(this) // Create a new tween that modifies 'coords'.
        .to(<Partial<DisplayObject>>{ alpha: 0 }, 150) // Move to (300, 200) in 1 second.
        .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
        .start() // Start the tween immediately.
        .onComplete(() => {
          resolve(void 0)
        })
    })
  }

  destroy() {

  }
}