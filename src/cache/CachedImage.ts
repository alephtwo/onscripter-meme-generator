export class CachedImage {
  #url: string;
  #image: HTMLImageElement;
  #loaded: boolean;

  constructor(url: string) {
    this.#url = url;
    this.#image = new Image();
    this.#loaded = false;
  }

  async load(): Promise<CachedImage> {
    return new Promise((resolve) => {
      this.#image.addEventListener('load', () => {
        this.#loaded = true;
        resolve(this);
      });
      this.#image.src = this.#url;
    });
  }

  isLoaded(): boolean {
    return this.#loaded;
  }

  getImage(): HTMLImageElement {
    return this.#image;
  }

  getUrl(): string {
    return this.#url;
  }
}
