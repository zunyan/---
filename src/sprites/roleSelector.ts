import { Container, Sprite } from "pixi.js";
import roleFactory, { TRoleEnum } from "../textureFactory/roleFactory";

export default class RoleSelector extends Container {
    onSelectedCallback: (p: TRoleEnum) => void = () => null;
    _activeRole: TRoleEnum = TRoleEnum['role_marid']
    map: Partial<Record<TRoleEnum, Sprite>> = {}
    selectedTag: Sprite;

    constructor(activeRole: TRoleEnum = TRoleEnum['role_marid']) {
        super()
        Object.values(TRoleEnum).map((item, index) => {
            const role = new Sprite(roleFactory()[item])
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

        this.selectedTag = new Sprite(roleFactory().role_selected)
        this.selectedTag.visible = false

        this.addChild(this.selectedTag)
        this.activeRole = activeRole
    }

    set activeRole(value: TRoleEnum){
        const roleSprite = this.map[value]
        if(roleSprite){
            this.selectedTag.visible = true
            this.selectedTag.x = roleSprite.x + 30
            this.selectedTag.y = roleSprite.y + 15
        }else{
            this.selectedTag.visible = false
        }

        this._activeRole = value
    }

    get activeRole() : TRoleEnum{
        return this._activeRole
    }

    onSelected(fn: (p: TRoleEnum) => void) {
        this.onSelectedCallback = fn
    }
}