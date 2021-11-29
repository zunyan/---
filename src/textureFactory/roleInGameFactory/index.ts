import bazziFactoy from "./bazziFactoy";
import { TGameRole } from "../roleSelectFactory";
import cappiFactoy from "./cappiFactoy";
import { roleAniScheme } from "./roleAniScheme";
import { Texture } from "pixi.js";
import maridFactoy from "./maridFactoy";
import daoFactoy from "./daoFactoy";

export default function roleInGameFactory(): Record<TGameRole, Record<roleAniScheme, Texture>> {
    return {
        [TGameRole.role_buzzi]: bazziFactoy(),
        [TGameRole.role_cappi]: cappiFactoy(),
        [TGameRole.role_marid]: maridFactoy(),
        [TGameRole.role_dao]: daoFactoy(),
    }
}