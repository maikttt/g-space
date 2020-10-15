export interface MoveLaw {
  (t: number, position: Position): Position;
}

export interface IPosition {
  readonly x: number;
  readonly y: number;
  add(x: number, y: number): IPosition;
}

export interface IShape {
  readonly w: number;
  readonly h: number;
  readonly image: any;
}

export interface ICharacter {
  position: IPosition;
  shape: IShape;
}

export interface IDisplay {
  setCenter(position: IPosition): void;
  clean(): void;
  drawCharacter(character: ICharacter): void;
  drawLandscape(landscape: ILandscape): void;
}

export interface ILandscape {
  readonly shape: IShape;
}

export interface IDefender extends ICharacter {
  move(dx: number, dy: number): void;
}

export interface IMonster extends ICharacter {
  move(): void;
}

export class Position implements IPosition {
  public readonly x: number;
  public readonly y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public add(x: number, y: number): IPosition {
    return new Position(this.x + x, this.y + y);
  }
}

export class Shape implements IShape {
  public readonly w: number;
  public readonly h: number;
  public readonly image: any;

  constructor(image: any, w: number, h: number) {
    this.w = w;
    this.h = h;
    this.image = image;
  }
}
