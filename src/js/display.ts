import { IPosition, IDisplay, ICharacter, ILandscape, Position } from './base';
import { Monster, Bullet } from './characters';

const COLOR_DISPLAY = '#000000';

export class Display implements IDisplay {
  public context: CanvasRenderingContext2D;
  public position: IPosition;

  constructor(context: CanvasRenderingContext2D, position: IPosition) {
    this.context = context;
    this.setCenter(position);
  }

  public getAbsoluteX(relativeX: number): number {
    return relativeX + this.position.x - this.context.canvas.width  / 2;
  }

  public getAbsoluteY(relativeY: number): number {
    return relativeY + this.position.y - this.context.canvas.height / 2;
  }

  private getRealativeX(absoluteX: number): number {
    return absoluteX - (this.position.x - this.context.canvas.width / 2);
  }

  private getRealativeY(absoluteY: number): number {
    return absoluteY - (this.position.y - this.context.canvas.height / 2);
  }

  public setCenter(position: IPosition): void {
    this.position = new Position(position.x, position.y);
  }

  public clean(): void {
    const { context } = this;
    context.beginPath();
    context.rect(0, 0, context.canvas.width, context.canvas.height);
    context.fillStyle = COLOR_DISPLAY;
    context.fill();
  }

  public drawCharacter(character: ICharacter): void {
    const { context } = this;
    const { shape, position, direction } = character;
    context.setTransform(
      1, 0, 0, 1,
      this.getRealativeX(position.x),
      this.getRealativeY(position.y),
    );
    context.rotate(direction.alpha);

    context.drawImage(
      shape.image,
      shape.sx, shape.sy,
      shape.sWidth, shape.sHeight,
      - shape.dWidth / 2,
      - shape.dHeight / 2,
      shape.dWidth, shape.dHeight
    );
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.rotate(0);
  }

  public drawLandscape(landscape: ILandscape): void {
    const { context } = this;
    const { width, height } = context.canvas;
    const { shape } = landscape;
    const sx = drawFrom(this.position.x, shape.dWidth);
    const sy = drawFrom(this.position.y, shape.dHeight);

    let _sx = sx;
    while (_sx < width) {
      let _sy = sy;
      while (_sy < height) {
        context.drawImage(
          shape.image,
          shape.sx, shape.sy,
          shape.sWidth, shape.sHeight,
          _sx, _sy,
          shape.dWidth, shape.dHeight
        );
        _sy += shape.dHeight;
      }
      _sx += shape.dWidth;
    }
  }
}

const drawFrom = (x: number, w: number): number => {
  const d = Math.abs(x) % w;
  if (x < 0) {
    return d - w;
  }
  return -d;
};
