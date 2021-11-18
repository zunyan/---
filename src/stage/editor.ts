import { Container } from "pixi.js";
import { STAGE_HEIGHT, STAGE_WIDTH } from "../constant";
import { TMaptheme } from "../global";
import Stage from "./stage";
import ThemePicker from './themePicker'

export default class Editor extends Stage {

  constructor() {
    super()

    // 选择主题
    // init theme picker
    const themePicker = new ThemePicker(STAGE_WIDTH * 0.8, STAGE_HEIGHT * 0.8)
    themePicker.onClose(this.initMap.bind(this))
    themePicker.onSelected(this.initMap.bind(this))




    // 

  }

  initMap(style: TMaptheme){
    // 进行地板绘制
    // const mapPreview = new Container()
    // mapPreview.width = STAGE_WIDTH
    // mapPreview.height = STAGE_HEIGHT、


    // 绘制元素栏


    // 时间绑定和拖拽
  }

  onCancelThemeSelect(){
    this.parent as 
  }



}