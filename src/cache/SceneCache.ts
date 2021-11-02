import { CachedImage } from './CachedImage';

interface SceneCacheArgs {
  background: string;
  sprite: string;
  font: FontFace;
  text: string;
}
export class SceneCache {
  #background: CachedImage;
  #sprite: CachedImage;
  #font: FontFace;
  #text: string;

  constructor(args: SceneCacheArgs) {
    this.#background = new CachedImage(args.background);
    this.#sprite = new CachedImage(args.sprite);
    this.#font = args.font;
    this.#text = args.text;
  }

  async initialize(): Promise<SceneCache> {
    await Promise.all([this.#loadBackground(), this.#loadSprite(), this.#loadFont()]);
    return this;
  }

  getBackground(): CachedImage {
    return this.#background;
  }

  async setBackground(url: string): Promise<SceneCache> {
    if (url === this.#background.getUrl() && this.#background.isLoaded()) {
      return Promise.resolve(this);
    }

    this.#background = new CachedImage(url);
    await this.#loadBackground();
    return this;
  }

  async #loadBackground(): Promise<void> {
    await this.#background.load();
  }

  getSprite(): CachedImage {
    return this.#sprite;
  }

  async setSprite(url: string): Promise<SceneCache> {
    if (url === this.#sprite.getUrl() && this.#sprite.isLoaded()) {
      return Promise.resolve(this);
    }

    this.#sprite = new CachedImage(url);
    await this.#loadSprite();
    return this;
  }

  async #loadSprite(): Promise<void> {
    await this.#sprite.load();
  }

  getFont(): FontFace {
    return this.#font;
  }

  async setFont(font: FontFace): Promise<SceneCache> {
    if (this.#font === font) {
      return Promise.resolve(this);
    }

    this.#font = font;
    await this.#loadFont();
    return this;
  }

  async #loadFont(): Promise<void> {
    await this.#font.load().then((f) => {
      // @ts-expect-error This has broad adoption but isn't in typescript spec yet
      // see: https://caniuse.com/font-loading
      // Ignore the error for now
      document.fonts.add(f); // eslint-disable-line @typescript-eslint/no-unsafe-call
    });
  }

  getText(): string {
    return this.#text;
  }

  setText(text: string): Promise<SceneCache> {
    this.#text = text;
    return Promise.resolve(this);
  }
}
