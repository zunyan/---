import { Loader, Rectangle, Texture } from "pixi.js";
import { COMMON_TEXTURE } from "../COMMON";

export enum TRoleEnum {
    role_marid = 'role_marid',
    role_buzzi = 'role_buzzi',
    role_dao = 'role_dao',
    role_cappi = 'role_cappi'
}

type TRoleTexture = Record<TRoleEnum | "role_selected", Texture>

let cache: any;

export default function roleFactory(): TRoleTexture {
    return cache = cache || {
        role_marid: Loader.shared.resources[COMMON_TEXTURE.role_marid].texture,
        role_buzzi: Loader.shared.resources[COMMON_TEXTURE.role_buzzi].texture,
        role_dao: Loader.shared.resources[COMMON_TEXTURE.role_dao].texture,
        role_cappi: Loader.shared.resources[COMMON_TEXTURE.role_cappi].texture,
        role_selected: Loader.shared.resources[COMMON_TEXTURE.role_selected].texture,
    }
}