import { ILandscape, IShape } from './base';

export class Landscape implements ILandscape {
  public readonly shape: IShape;

  constructor(shape: IShape) {
    this.shape = shape
  }
}
