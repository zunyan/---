import { filters, Sprite, Texture } from "pixi.js";

export default class UITextureButton extends Sprite {
  baseTexture: Texture | undefined;
  hoverTexture: Texture | undefined;
  constructor(baseTexture: Texture | undefined, hoverTexture?: Texture | undefined) {
    super(baseTexture);

    this.baseTexture = baseTexture;
    this.hoverTexture = hoverTexture;

    this.interactive = true;
    this.buttonMode = true;
    this.on('pointerdown', () => this.onHover())
    this.on('pointerup', () => this.reset())
    this.on('pointerleave', () => this.reset())
    this.on('pointerout', () => this.reset())
    this.on('touchendoutside', () => this.reset())
    this.on('touchend', () => this.reset())
  }

  onHover() {
    if (this.hoverTexture) {
      this.texture = this.hoverTexture;
    } else {
      const filter = new filters.ColorMatrixFilter()
      filter.sepia(true)
      filter.saturate(4, true)
      filter.brightness(1.15, true)

      this.filters = [filter]
    }
  }

  reset() {
    if (this.baseTexture) {
      this.texture = this.baseTexture;
      this.filters = []
    }
  }
}
