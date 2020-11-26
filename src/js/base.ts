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
  w: number;
  h: number;
  image: any;
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
  move(speed: number): void;
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
  public w: number;
  public h: number;
  public image: any;

  constructor(image: any, w: number, h: number) {
    this.w = w;
    this.h = h;
    this.image = image;
  }
}
