import { Graphics } from "pixi.js";
import { GRID_HEIGHT, GRID_HEIGHT_SIZE, GRID_WIDTH, GRID_WIDTH_SIZE, STAGE_HEIGHT, STAGE_WIDTH } from "../constant";
import { TBubbleStyle } from "../global";
import Block from "../sprites/block";
import Bubble from "../sprites/bubble";
import Person from "../sprites/person";
import bubbleFactory from "../textureFactory/bubbleFactory";
import mapFactory from "../textureFactory/mapFactory";
import Stage from "./stage";

export default class GameStage extends Stage {

    person: any;
    bubbles: Bubble[] = [];
    map: Block[][] = [];

    constructor() {
        super()

        this.drawMap()

        this.person = new Person(20, 10)
        this.addChild(this.person)

        document.onkeydown = this.person.handleKeydown.bind(this.person)
        document.onkeyup = this.person.handleKeyup.bind(this.person)

    }

    drawMap() {
        const g = new Graphics()
        g.width = STAGE_WIDTH
        g.height = STAGE_HEIGHT
        g.lineStyle({
            width: 3,
            color: 0x000000
        })
        for (let i = 0; i < STAGE_WIDTH; i += GRID_WIDTH) {
            g.moveTo(i, 0)
            g.lineTo(i, STAGE_HEIGHT)
        }

        for (let i = 0; i < STAGE_HEIGHT; i += GRID_HEIGHT) {
            g.moveTo(0, i)
            g.lineTo(STAGE_WIDTH, i)
        }

        g.zIndex = 0
        this.addChild(g)

        for (let i = 0; i < STAGE_WIDTH / GRID_WIDTH; i++) {
            for (let j = 0; j < STAGE_HEIGHT / GRID_HEIGHT; j++) {
                this.map[i] = this.map[i] || []
                const block = new Block(mapFactory().map_flopy_tile2_1)
                block.x = i * GRID_WIDTH
                block.y = j * GRID_HEIGHT
                this.map[i][j] = block
                this.addChild(block)
            }
        }

        this.sortChildren()

    }

    onCreateBubble(x: number, y: number, style: TBubbleStyle, power: number) {
        if (this.bubbles.some(item => item.gridX == x && item.gridY == y)) {
            return
        }

        const bubble = new Bubble(bubbleFactory()[style], x, y, power)
        bubble.zIndex = 1

        this.addChild(bubble)
        this.bubbles.push(bubble)

        setTimeout(() => {
            bubble.boom()
            this.bubbles = this.bubbles.filter(item => item != bubble)
        }, 2000)

        this.sortChildren()

    }

    iCanGo(gridX: number, gridY: number): boolean {
        return gridX >= 0 && GRID_WIDTH_SIZE > gridX &&
            gridY >= 0 && GRID_HEIGHT_SIZE > gridY &&
            this.map[gridX][gridY].canPass &&
            !this.bubbles.some(item => item.gridX == gridX && item.gridY == gridY)
    }

    onUpdate(){

    }
}