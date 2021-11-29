import { Container, filters, Sprite } from "pixi.js";
import roleSelectFactory, { TGameRole } from "../textureFactory/roleSelectFactory";

export default class RoleSelector extends Container {
    onSelectedCallback: (p: TGameRole) => void = () => null;
    _activeRole: TGameRole = TGameRole['role_marid']
    map: Partial<Record<TGameRole, Sprite>> = {}
    selectedTag: Sprite;
    hightFilter: any;

    constructor(activeRole: TGameRole = TGameRole['role_marid']) {
        super()
        Object.values(TGameRole).map((item, index) => {
            const role = new Sprite(roleSelectFactory()[item])
            role.x = index % 4 * (role.width + 8)
            role.y = Math.floor(index / 4) * (role.height + 8)
            role.interactive = true
            role.on('click', () => {
                this.activeRole = item
                this.onSelectedCallback(item)
            })
            this.addChild(role)
            this.map[item] = role
        })

        this.selectedTag = new Sprite(roleSelectFactory().role_selected)
        this.selectedTag.visible = false

        this.addChild(this.selectedTag)
        this.activeRole = activeRole


        const filter = this.hightFilter = new filters.ColorMatrixFilter()
        filter.sepia(true)
        filter.saturate(4, true)
        filter.brightness(1.15, true)
    }

    set activeRole(value: TGameRole) {
        const old = this.map[this._activeRole]
        if (old) {
            old.filters = []
        }
        const roleSprite = this.map[value]
        if (roleSprite) {
            this.selectedTag.visible = true
            this.selectedTag.x = roleSprite.x + 30
            this.selectedTag.y = roleSprite.y + 15

            const filter = new filters.ColorMatrixFilter()
            filter.sepia(true)
            filter.saturate(4, true)
            filter.brightness(1.15, true)
            roleSprite.filters = [filter]
        } else {
            this.selectedTag.visible = false
        }

        this._activeRole = value
    }

    get activeRole(): TGameRole {
        return this._activeRole
    }

    onSelected(fn: (p: TGameRole) => void) {
        this.onSelectedCallback = fn
    }
}