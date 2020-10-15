import { MoveLaw, Position, Shape } from './base';
import { Display } from './display';
import { Defender, Monster } from './characters';
import { Game } from './game';
import { Landscape } from './landscape';

export default function makeGame(context: any, landscapeData: any, defenderData: any, monsterData: any[]): Game {
  const display = new Display(context, new Position(0, 0));
  const landscape = new Landscape(
    new Shape(landscapeData.img, landscapeData.w, landscapeData.h)
  );
  const defender = new Defender(
    new Position(defenderData.x, defenderData.y),
    new Shape(defenderData.img, defenderData.w, defenderData.h)
  );
  const monsters = makeMonsters(monsterData);
  return new Game(display, landscape, defender, monsters);
}

function makeMonsters(monsterData: any[]): Monster[] {
  return monsterData.map((m) => {
    const law =  circleMoveRow(m.x, m.y, m.r);
    return new Monster(
      law(0, new Position(0, 0)), law, new Shape(m.img, m.w, m.h)
    );
  });
}

function circleMoveRow(x: number, y: number, r: number): MoveLaw {
  let alpha = 0;
  const omega = getSpeed(-10, 10)
  return (t: number, p: Position): Position => {
    alpha += omega;
    return new Position(
      r * Math.sin(rad(alpha)) + x,
      r * Math.cos(rad(alpha)) + y
    );
  };
}

function rad(alpha: number): number {
  return Math.PI * alpha / 180;
}

function getSpeed(from: number, to: number): number {
  return Math.floor(Math.random() * (to - from)) + from;
}
