import { MoveLaw, Position, Direction, Shape } from './base';
import { Display } from './display';
import { Defender, Gun, Monster } from './characters';
import { Game } from './game';
import { Landscape } from './landscape';
import { ExplostionFactory } from './explosions-factory';

export default function makeGame(
  context: CanvasRenderingContext2D,
  landscapeData: any,
  defenderData: any,
  monsterData: any[],
  bulletData: any,
  explosionImg: HTMLImageElement
): Game {
  const display = new Display(context, new Position(0, 0));
  const landscape = new Landscape(
    Shape.fromImage(landscapeData.img, landscapeData.w, landscapeData.h)
  );
  const defender = new Defender(
    new Position(defenderData.x, defenderData.y),
    new Direction(0),
    Shape.fromImage(defenderData.img, defenderData.w, defenderData.h),
    new Gun(
      bulletData.speed,
      Shape.fromImage(bulletData.img, bulletData.w, bulletData.h)
    )
  );
  const explosionsFactory = new ExplostionFactory(explosionImg);
  const monsters = makeMonsters(monsterData, defender);
  return new Game(
    display, landscape, defender, monsters, explosionsFactory
  );
}

function makeMonsters(monsterData: any[], goal: any): Monster[] {
  return monsterData.map((m) => {
    return new Monster(
      new Position(
        random(-200, 200), random(-250, 250)
      ),
      new Direction(Math.random() * Math.PI),
      Shape.fromImage(m.img, m.w, m.h),
      (t: number, p: Position): Position => {
        return new Position(p.x, p.y);
      },
    );
  });
}

function random(from: number, to: number): number {
  return Math.floor(Math.random() * (to - from)) + from;
}
