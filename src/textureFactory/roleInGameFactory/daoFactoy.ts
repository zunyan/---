import { Loader, Rectangle, Texture } from "pixi.js";
import { COMMON_TEXTURE } from "../../COMMON";
import { roleAniScheme } from "./roleAniScheme";

let cache: any;

export default function daoFactoy(): Record<roleAniScheme, Texture> {
  const texture = Loader.shared.resources[COMMON_TEXTURE.unit_dao].texture
  return cache = cache || {
    right_5: new Texture(<any>texture, new Rectangle(463, 67, 42, 55)),
    right_4: new Texture(<any>texture, new Rectangle(473, 135, 44, 57)),
    right_3: new Texture(<any>texture, new Rectangle(404, 135, 42, 57)),
    right_2: new Texture(<any>texture, new Rectangle(334, 137, 42, 55)),
    right_1: new Texture(<any>texture, new Rectangle(263, 137, 42, 55)),
    up_5: new Texture(<any>texture, new Rectangle(314, 67, 52, 55)),
    up_1: new Texture(<any>texture, new Rectangle(63, 135, 51, 57)),
    up_2: new Texture(<any>texture, new Rectangle(66, 206, 49, 57)),
    up_3: new Texture(<any>texture, new Rectangle(66, 277, 49, 57)),
    up_4: new Texture(<any>texture, new Rectangle(67, 348, 48, 57)),
    down_4: new Texture(<any>texture, new Rectangle(138, 348, 48, 57)),
    down_3: new Texture(<any>texture, new Rectangle(138, 277, 48, 57)),
    down_2: new Texture(<any>texture, new Rectangle(138, 206, 48, 57)),
    down_1: new Texture(<any>texture, new Rectangle(138, 135, 48, 57)),
    down_5: new Texture(<any>texture, new Rectangle(385, 67, 52, 55)),
  }
}