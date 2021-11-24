import { Container } from "pixi.js";
import { TMaptheme } from "../global";

export default class ThemePicker extends Container {
    constructor(width: number, height: number) {
        super()

        this.width = width
        this.height = height
    }

    onSelected(fn: (style: TMaptheme)=> void): this {
        return this
    }

    onClose(fn: ()=> void){

    }

}