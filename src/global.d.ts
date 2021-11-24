import { Sprite, Texture } from "pixi.js"
import { TRoleEnum } from "./textureFactory/roleFactory"

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
    block?: Sprite
    floor: string,
    top: string,
    type: boolean,
    prop?: string
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

interface TPlayer {
    name: string,
    status: TPlayerStatus,
    role: TRoleEnum,
    isMaster: boolean
}

interface TRoom {
    id: string,
    name: string,
    players: TPlayer[],
    totalPlayer: number,
    status: TRoomStatus
}