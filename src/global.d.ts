import { Sprite, Texture } from "pixi.js"
import { TGameRole } from "./textureFactory/roleSelectFactory"

interface TPersonTextureMap {
    down_1: Texture,
    down_2: Texture,
    down_3: Texture,
    down_4: Texture,
    down_5: Texture,

    up_1: Texture,
    up_2: Texture,
    up_3: Texture,
    up_4: Texture,
    up_5: Texture,

    right_1: Texture,
    right_2: Texture,
    right_3: Texture,
    right_4: Texture,
    right_5: Texture,
}

interface MapBlock {
    /**
     * 当前位于改位置的箱体，如果没有，那么会事undefined
     */
    block?: Sprite
    floor: string,
    top: string,
    /**
     * 物体是否可被破坏
     */
    type: boolean,
    prop?: TGamePropEnum
}

type TBubbleStyle = "RANBOW" |
    "BLUE" |
    "BLACK" |
    "RED" |
    "DARK_RED" |
    "RED_AND_BLUE" |
    "SOAP" |
    "Skulls" |
    "black_flame" |
    "ocean"


type TMaptheme = "小区"

export enum TRoomStatus {
    WAITING = 0,
    IN_GAME = 1,
}

export enum TPlayerStatus {
    PENDING = 0,
    READY = 1,
}

export interface TPlayer {
    name: string,
    status: TPlayerStatus,
    role: TGameRole,
    isMaster: boolean
}

export interface TRoom {
    id: string,
    name: string,
    players: TPlayer[],
    totalPlayer: number,
    status: TRoomStatus
}

export enum TGamePlayerStatus {
    GAME_PROPS_ALIVE = 1,
    GAME_PROPS_DEAD = 2
}
export interface TGamePlayer {
    gridX: number,
    gridY: number,
    name: string,
    status: TGamePlayerStatus,
    speed: number,
    power: number,
    bubbles: number,
    x: number,
    y: number,
    moveTarget: TGamePlayerMoveTarget,
    role: TGameRole
}

export interface TGamePlayerLoaction {
    gridX: number,
    gridY: number,
    x: number,
    y: number,
}

// TGamePropEnum
export enum TGamePropEnum {
    TGamePropEnum_NONE = 0,
    TGamePropEnum_SHOSE = 1,
    TGamePropEnum_LOTION = 2,
    TGamePropEnum_BUBBLES = 3,
}

export interface TGameBox {
    gridX: number,
    gridY: number,
    status: boolean,
    props: TGamePropEnum
}

export enum TGamePlayerMoveTarget {
    Left = "Left",
    Right = "Right",
    Up = "Up",
    Down = "Down",
    None = "None"
}


export interface TGameBubble {
    gridX: number,
    gridY: number,
    power: number
}

export interface TGameBoomBubble{
    gridX: number,
    gridY: number,
    left: number,
    right: number,
    top: number,
    bottom: number
}

export interface TGameInfo {
    props: TGameBox[],
    players: TGamePlayer[],
    bubbles: TGameBubble[],
}