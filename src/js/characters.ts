import {
  IPosition, IDirection, IShape, IExplosion, IDefender,
  IMonster, IGun, MoveLaw, IBullet, Position, Direction, IAnimatedShape
} from './base';

export class Defender implements IDefender {
  public position: IPosition;
  public direction: IDirection;
  public shape: IShape;
  public gun: IGun;

  constructor(position: IPosition, direction: IDirection, shape: IShape, gun: IGun) {
    this.position = position;
    this.direction = direction;
    this.shape = shape;
    this.gun = gun;
  }

  movePosition(dx: number, dy: number): void {
    this.position.add(dx, dy);
  }

  move(speed: number): void {
    this.position.add(
      speed * Math.cos(this.direction.alpha),
      speed * Math.sin(this.direction.alpha),
    );
  }

  shut(): IBullet {
    return this.gun.shut(
      new Position(this.position.x, this.position.y),
      new Direction(this.direction.alpha),
    );
  }
}

export class Monster implements IMonster {
  public shape: IShape;
  public position: IPosition;
  public direction: IDirection;
  public moveLaw: MoveLaw;

  constructor(position: IPosition, direction: IDirection, shape: IShape, moveLaw: MoveLaw) {
    this.position = position;
    this.direction = direction;
    this.shape = shape;
    this.moveLaw = moveLaw;
  }

  move(): void {
    this.position = this.moveLaw(0, this.position);
  }
}

export class Gun implements IGun {
  private bulletShape: IShape;
  private speed: number;

  constructor(speed: number, bulletShape: IShape) {
    this.bulletShape = bulletShape;
    this.speed = speed;
  }

  shut(position: IPosition, direction: IDirection): IBullet {
    return new Bullet(
      this.speed, position, direction, this.bulletShape
    )
  }
}

export class Bullet implements IBullet {
  public speed: number;
  public shape: IShape;
  public position: IPosition;
  public direction: IDirection;

  constructor(speed: number, position: IPosition, direction: IDirection, shape: IShape) {
    this.speed = speed;
    this.position = position;
    this.direction = direction;
    this.shape = shape;
  }

  move(): void {
    // console.log(this.speed, this.direction, this.position);
    this.position.add(
      this.speed * Math.cos(this.direction.alpha),
      this.speed * Math.sin(this.direction.alpha),
    );
  }
}

export class Explosion implements IExplosion {
  public position: IPosition;
  public shape: IAnimatedShape;
  public direction: IDirection;

  constructor(position: IPosition, shape: IAnimatedShape, direction: IDirection) {
    this.position = position;
    this.shape = shape;
    this.direction = direction;
  }
}
