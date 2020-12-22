import { IExplosionFactory, IPosition, AnimatedShape, IExplosion, Direction } from './base';
import { Explosion } from './characters';

export class ExplostionFactory implements IExplosionFactory {
  private explosionShapeImg: HTMLImageElement;

  public constructor(explosionShapeImg: HTMLImageElement) {
    this.explosionShapeImg = explosionShapeImg;
  }

  public explosion(position: IPosition): IExplosion {
    return new Explosion(
      position,
      new AnimatedShape(this.explosionShapeImg, 0, 0, 71, 71, 64, 64),
      new Direction(0)
    );
  }
}
