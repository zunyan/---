import { Container } from "pixi.js";
import { STAGE_HEIGHT, STAGE_WIDTH } from "../constant";

export default class Stage extends Container{
    constructor(){
        super()
        this.width = STAGE_WIDTH
        this.height = STAGE_HEIGHT        
    }
}