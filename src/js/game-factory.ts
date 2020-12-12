import { MoveLaw, Position, Direction, Shape } from './base';
import { Display } from './display';
import { Defender, Gun, Monster } from './characters';
import { Game } from './game';
import { Landscape } from './landscape';

export default function makeGame(
  context: CanvasRenderingContext2D,
  landscapeData: any,
  defenderData: any,
  monsterData: any[],
  bulletData: any
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
  const monsters = makeMonsters(monsterData, defender);
  return new Game(display, landscape, defender, monsters);
}

function makeMonsters(monsterData: any[], goal: any): Monster[] {
  return [
    new Monster(
      new Position(-100, 0),
      new Direction(-Math.PI),
      Shape.fromImage(monsterData[0].img, monsterData[0].w, monsterData[0].h),
      (t: number, p: Position): Position => {
        return new Position(p.x, p.y);
      },
    )
  ];
  return monsterData.map((m) => {
    return new Monster(
      new Position(
        random(-200, 200), random(-200, 200)
      ),
      new Direction(0),
      Shape.fromImage(m.img, m.w, m.h),
      moveToLaw(goal),
    );
    // const law =  circleMoveRow(m.x, m.y, m.r);
    // return new Monster(
    //   law(0, new Position(0, 0)), law, Shape.fromImage(m.img, m.w, m.h)
    // );
  });
}

function moveToLaw(goal: any): MoveLaw {
  const speed = 4; // random(2, 10);
  return (t: number, p: Position): Position {
    const dir_x = goal.position.x - p.x;
    const dir_y = goal.position.y - p.y;
    const dir_m = Math.sqrt(dir_x ** 2 + dir_y ** 2);
    if (dir_m === 0 || speed === 0) {
      return new Position(p.x, p.y);
    }
    return new Position(
      p.x + Math.round( speed * dir_x / dir_m ),
      p.y + Math.round( speed * dir_y / dir_m ),
    )
  }
}

function circleMoveRow(x: number, y: number, r: number): MoveLaw {
  let alpha = 0;
  const omega = random(-10, 10)
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

function random(from: number, to: number): number {
  return Math.floor(Math.random() * (to - from)) + from;
}
