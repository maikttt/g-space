export interface MoveLaw {
  (t: number, position: Position): Position;
}

export interface IPosition {
  x: number;
  y: number;
  add(x: number, y: number): void;
}

export interface IDirection {
  alpha: number;
  setFromAbsoluteXY(x: number, y: number): void;
}

export interface IShape {
  image: any;
  sx: number;
  sy: number;
  sWidth: number;
  sHeight: number;
  dWidth: number;
  dHeight: number;
}

export interface IAnimatedShape extends IShape {
  hasSprite(): boolean;
  nextSprite(): IAnimatedShape;
  reset(): IAnimatedShape;
}

export interface ICharacter {
  position: IPosition;
  shape: IShape;
  direction: IDirection;
}

export interface IDisplay {
  context: CanvasRenderingContext2D;
  position: IPosition;

  getAbsoluteX(relativeX: number): number;
  getAbsoluteY(relativeY: number): number;
  setCenter(position: IPosition): void;
  clean(): void;
  drawCharacter(character: ICharacter): void;
  drawLandscape(landscape: ILandscape): void;
}

export interface ILandscape {
  shape: IShape;
}

export interface IDefender extends ICharacter {
  movePosition(dx: number, dy: number): void;
  move(speed: number): void;
  shut(): IBullet;
}

export interface IMonster extends ICharacter {
  move(): void;
}

// Bullets factory
export interface IGun {
  shut(position: IPosition, direction: IDirection): IBullet;
}

export interface IBullet extends ICharacter {
  move(): void;
}

export class Position implements IPosition {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public add(x: number, y: number): void {
    this.x += x;
    this.y += y;
  }
}

export class Direction implements IDirection {
  public alpha: number;

  public constructor(alpha: number) {
    this.alpha = alpha;
  }

  public setFromAbsoluteXY(x: number, y: number): void {
    let alpha = 0;
    if (x !== 0 || y !== 0) {
      alpha = Math.asin(
        y / Math.sqrt(x ** 2 + y ** 2)
      );
    }
    if (x < 0) {
      alpha = Math.sign(alpha) * (Math.PI - Math.abs(alpha));
    }
    this.alpha = alpha;
  }
}

export class Shape implements IShape {
  public image: any;
  public sx: number;
  public sy: number;
  public sWidth: number;
  public sHeight: number;
  public dWidth: number;
  public dHeight: number;

  constructor(image: any, sx: number, sy: number, sWidth: number, sHeight: number, dWidth: number, dHeight: number) {
    this.image = image;
    this.sx = sx;
    this.sy = sy;
    this.sWidth = sWidth;
    this.sHeight = sHeight;
    this.dWidth = dWidth;
    this.dHeight = dHeight;
  }

  public static fromImage(image: any, width: number, height: number) {
    return new Shape(
      image, 0, 0, image.width, image.height,  width, height
    );
  }
}

export class AnimatedShape implements IShape {
  public image: any;
  public sx: number;
  public sy: number;
  public sWidth: number;
  public sHeight: number;
  public dWidth: number;
  public dHeight: number;

  constructor(image: any, sx: number, sy: number, sWidth: number, sHeight: number, dWidth: number, dHeight: number) {
    this.image = image;
    this.sx = sx;
    this.sy = sy;
    this.sWidth = sWidth;
    this.sHeight = sHeight;
    this.dWidth = dWidth;
    this.dHeight = dHeight;
  }

  public hasSprite() {
    return this.sy < this.image.height;
  }

  public nextSprite() {
    this.sx += this.sWidth;
    if (this.sx <= this.image.width) {
      this.sx = 0;
      this.sy += this.sHeight;
    }
    return this;
  }

  public reset() {
    this.sx = 0;
    this.sy = 0;
    return this;
  }
}
