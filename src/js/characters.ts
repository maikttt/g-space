import { IPosition, IShape, ICharacter, IDefender, IMonster, MoveLaw, Position } from './base';

export class Defender implements IDefender {
  public position: IPosition;
  public shape: IShape;

  constructor(position: IPosition, shape: IShape) {
    this.position = position;
    this.shape = shape;
  }

  move(dx: number, dy: number): void {
    this.position = new Position(this.position.x + dx, this.position.y + dy);
  }
}

export class Monster implements IMonster {
  public shape: IShape;
  public position: IPosition;
  public moveLaw: MoveLaw;

  constructor(position: IPosition, moveLaw: MoveLaw, shape: IShape) {
    this.position = position;
    this.shape = shape;
    this.moveLaw = moveLaw;
  }

  move(): void {
    this.position = this.moveLaw(0, this.position);
  }
}
