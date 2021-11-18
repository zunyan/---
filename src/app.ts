import { Application, BitmapText, Graphics, IApplicationOptions, Loader, Sprite, TextStyle } from "pixi.js";
import { GRID_HEIGHT, GRID_WIDTH, STAGE_HEIGHT, STAGE_WIDTH } from "./constant";
import Person from "./sprites/person";
import { COMMON_TEXTURE_LIST } from './COMMON';
import GameStage from "./stage/game";

export default class App extends Application{
    person: Person | undefined;


    constructor(props: IApplicationOptions){
        super(props)
        
        // LOADER
        COMMON_TEXTURE_LIST.forEach(<any>Loader.shared.add.bind(Loader.shared))
        Loader.shared.onComplete.once(this.init.bind(this))
        Loader.shared.load()



    }

    init(){

        this.stage.addChild(new GameStage)

        this.ticker.add(()=>{
            const fn = function(obj: any){
                obj.children.forEach((item: any)=>{
                    if(item.onUpdate){
                        item.onUpdate()
                    } 
                    
                    if(item.children.length > 0){
                        fn(item)
                    }
                })
            }

            fn(this.stage)

        })

    }

    
}