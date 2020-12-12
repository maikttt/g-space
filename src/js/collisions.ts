import { ICharacter } from './base';

const PI_2 = Math.PI / 2;

interface IPoint {
  x: number;
  y: number;
}

const getCharacterPoints = (character: ICharacter): IPoint[] => {
  let { dWidth: w, dHeight: h } = character.shape;
  let { x, y } = character.position;
  let { alpha } = character.direction;
  w = w / 2;
  h = h / 2;
  return [
    [+w, +h], [+w, -h], [-w, -h], [-w, +h],
  ].map(([cx, cy]) => {
    return {
      x: x + (cx * Math.cos(alpha) - cy * Math.sin(alpha)),
      y: y + (cx * Math.sin(alpha) + cy * Math.cos(alpha)),
    };
  });
};

const getLine = (p1: IPoint, p2: IPoint) => {
  if (p1.x == p2.x) {
    return (p: IPoint): number => {
      return p1.x - p.x;
    };
  }

  const a = (p2.y - p1.y) / (p2.x - p1.x);
  const b = p1.y - p1.x * (p2.y - p1.y) / (p2.x - p1.x);
  return (p: IPoint): number => {
    return (p.x * a + b) - p.y;
  };
};

const isPointInside = (point: IPoint, polygon: IPoint[]): boolean => {
  if (polygon.length < 3) {
    throw new Error('Polygon can not has less than 3 angles');
  }
  const _polygon = [ ...polygon, polygon[0], polygon[1] ];

  const c = {x: 0, y: 0};
  for (let i = 0; i < polygon.length; i++) {
    c.x += polygon[i].x;
    c.y += polygon[i].y;
  }
  c.x /= polygon.length;
  c.y /= polygon.length;

  for (let i = 2; i < _polygon.length; i++) {
    const point_delta = getLine(_polygon[i - 2], _polygon[i - 1]);
    const delta_p = point_delta(point);
    const delta_c = point_delta(c);
    if (delta_p * delta_c < 0) {
      return false;
    }
  }
  return true;
};

function pHaveCollision(a: IPoint[], b: IPoint[]): boolean {
  for (let i = 0; i < a.length; i++) {
    if (isPointInside(a[i], b)) {
      return true;
    }
    // throw new Error("Fatal error");
  }
  for (let i = 0; i < b.length; i++) {
    if (isPointInside(b[i], a)) {
      return true;
    }
  }
  return false;
}

export const charactersHaveCollision = (a: ICharacter[], b: ICharacter[]): [number, number][] => {
  const points_a = a.map(getCharacterPoints);
  const points_b = b.map(getCharacterPoints);
  const collisions: [number, number][] = [];
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b.length; j++) {
      if (pHaveCollision(points_a[i], points_b[j])) {
        collisions.push([i, j]);
      }
    }
  }
  return collisions;
};
