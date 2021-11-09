import * as React from 'react';
import { createRef } from 'react';
import { CachedImage } from '../cache/CachedImage';
import { SceneCache } from '../cache/SceneCache';

interface SceneProps {
  cache: SceneCache;
}
export class Scene extends React.Component<SceneProps> {
  canvas: React.RefObject<HTMLCanvasElement>;
  cache: SceneCache;

  constructor(props: SceneProps) {
    super(props);
    this.canvas = createRef();
    this.cache = props.cache;
  }

  render() {
    return <canvas ref={this.canvas} width="640" height="480"></canvas>;
  }

  componentDidMount() {
    this.renderScene();
  }

  renderScene() {
    const scene = this.canvas.current;
    if (!scene) {
      console.error('no scene');
      return;
    }

    const context = scene.getContext('2d');
    if (!context) {
      console.error('no context available for canvas');
      return;
    }

    // Draw image
    this.#drawImage(context, this.cache.getBackground());
    this.#drawImage(context, this.cache.getSprite(), true);

    // Write text
    this.#renderText(context, this.cache.getFont(), this.cache.getText());
  }

  #renderText(context: CanvasRenderingContext2D, font: FontFace, text: string) {
    const fontSize = 16;

    // Set the font and shadow
    context.font = `${fontSize}pt ${font.family}`;
    context.fillStyle = 'white';
    context.shadowOffsetX = 1;
    context.shadowOffsetY = 1;
    context.shadowColor = 'black';

    // Break up the text we're given by lines.
    text.split('\n').forEach((line, i) => {
      const x = 20;
      // Space the lines out a little bit vertically.
      const y = 30 + (fontSize + 4) * i;
      context.fillText(line, x, y);
    });

    // Reset shadow
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.shadowColor = 'rgba(0, 0, 0, 0)';
  }

  #drawImage(context: CanvasRenderingContext2D, image: CachedImage, center = false) {
    const img = image.getImage();

    // Depending on the size of the canvas, we might need to scale the image.
    // Get the scale factor for that (which allows us to respect the aspect ratio).
    const scale = Math.min(context.canvas.width / img.width, context.canvas.height / img.height);
    const [width, height] = [img.width, img.height].map((x) => x * scale);

    // If we're centering, we need to figure out how far to shift the image.
    const offsetX = center ? this.#getCenteringOffset(width, context.canvas.width) : 0;

    context.drawImage(img, 0, 0, img.width, img.height, offsetX, 0, width, height);
  }

  #getCenteringOffset(imageWidth: number, canvasWidth: number): number {
    return (canvasWidth - imageWidth) / 2;
  }
}
