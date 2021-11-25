import { Loader, Rectangle, Texture } from "pixi.js";
import { COMMON_TEXTURE } from "../COMMON";
import { TRoleEnum } from "./roleFactory";

interface TBtnTextures {
  playerCard: Texture,
  playerCardNone: Texture,
}

let cache: any
export default function btnFactory(): Record<TRoleEnum, Texture> & TBtnTextures {
  const playerCard = Loader.shared.resources[COMMON_TEXTURE.room_player_card].texture
  const playerCardNone = Loader.shared.resources[COMMON_TEXTURE.room_player_card_none].texture
  const role_buzzi = Loader.shared.resources[COMMON_TEXTURE.unit_bazzi].texture
  const role_dao = Loader.shared.resources[COMMON_TEXTURE.unit_dao].texture
  const role_cappi = Loader.shared.resources[COMMON_TEXTURE.unit_cappi].texture
  const role_marid = Loader.shared.resources[COMMON_TEXTURE.unit_luxmarid].texture

  return cache = cache || {
    playerCard: new Texture(<any>playerCard),
    playerCardNone: new Texture(<any>playerCardNone),
    role_buzzi: new Texture(<any>role_buzzi, new Rectangle(382, 67, 44, 56)),
    role_dao: new Texture(<any>role_dao, new Rectangle(385, 67, 52, 55)),
    role_cappi: new Texture(<any>role_cappi, new Rectangle(348, 43, 52, 55)),
    role_marid: new Texture(<any>role_marid, new Rectangle(281, 137, 50, 55)),
  }
}
