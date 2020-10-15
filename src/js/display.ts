import { IShape, IPosition, IDisplay, ICharacter, ILandscape, Position } from './base';

const COLOR_DISPLAY = '#000000';

export class Display implements IDisplay {
  private context: any;
  private position: IPosition;

  constructor(context: any, position: IPosition) {
    this.context = context;
    this.setCenter(position);
  }

  setCenter(position: IPosition): void {
    const { context } = this;
    const cx = position.x - context.canvas.width / 2;
    const cy = position.y - context.canvas.height / 2;
    this.position = new Position(cx, cy);
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
    const { shape, position } = character;
    context.drawImage(
      shape.image, position.x - shape.w / 2 - this.position.x, position.y - shape.h / 2 - this.position.y, shape.w, shape.h
    );
  }

  public drawLandscape(landscape: ILandscape): void {
    const { context } = this;
    const { width, height } = context.canvas;
    const { shape } = landscape;
    const sx = drawFrom(this.position.x, shape.w);
    const sy = drawFrom(this.position.y, shape.h);

    let _sx = sx;
    while (_sx < width) {
      let _sy = sy;
      while (_sy < height) {
        context.drawImage(shape.image, _sx, _sy, shape.w, shape.h);
        _sy += shape.h;
      }
      _sx += shape.w;
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
