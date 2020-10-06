
const COLOR_DISPLAY = '#000000';

class Display {
  private context: any;
  private position: Position;

  constructor(context: any, position: Position) {
    this.context = context;
    this.setCenter(position);
  }

  setCenter(position: Position) {
    this.position = position;
  }

  public clean() {
    const { context } = this;
    context.beginPath();
    context.rect(0, 0, context.canvas.width, context.canvas.height);
    context.fillStyle = COLOR_DISPLAY;
    context.fill();
  }

  public drawShape(shape: CharacterShape, position: Position) {
    const { context } = this;
    const lx = this.position.x - context.canvas.width / 2;
    const ly = this.position.y - context.canvas.height / 2;
    context.drawImage(shape.image, position.x - lx - shape.w / 2, position.y - ly - shape.h / 2, shape.w, shape.h);
  }

  public drawMonster(monster: Monster) {
    this.drawShape(monster.shape, monster.position);
  }

  public drawDefender(defender: Defender) {
    this.drawShape(defender.shape, defender.position);
  }
}

class CharacterEvents {
  private events = {};

  public on(event: string, callback: Function) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  private trigger(event: string, ...args: any) {
    if (this.events[event]) {
      this.events[event].forEach((callback) => {
        callback.call(this, ...args)
      });
    }
  }

  public run() {
    console.log("Runnig...");
    setTimeout(() => {
      console.log("Trigger run");
      this.trigger('run', 1, 2, 3);
    }, 2000);
  }
}

class CharacterShape {
  public readonly w: number;
  public readonly h: number;
  public readonly image: any;

  constructor(image: any, w: number, h: number) {
    this.w = w;
    this.h = h;
    this.image = image;
  }

  draw(context: any, position: Position) {
    context.drawImage(this.image, position.x, position.y, this.w, this.h);
  }
}

class Position {
  public readonly x: number;
  public readonly y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public add(x: number, y: number) {
    this.x += x;
    this.y += y;
  }
}

class Defender {
  public readonly position: Position;
  public readonly shape: CharacterShape;

  constructor(position: Position, shape: CharacterShape) {
    this.position = position;
    this.shape = shape;
  }
}

class Monster {
  public events: CharacterEvents;
  public shape: CharacterShape;
  public position: Position;

  constructor(position: Position, shape: CharacterShape) {
    this.position = position;
    this.shape = shape;
  }
}

class Game {
  private display: Display;
  private defender: Defender;
  private monsters: Monster[];

  constructor(display: Display, defender: Defender, monsters: Monster[]) {
    this.display = display;
    this.defender = defender;
    this.monsters = monsters;
    this.redraw();
  }

  private draw() {
    const { display } = this;
    display.setCenter(this.defender.position);
    display.drawDefender(this.defender);
    this.monsters.forEach((monster) => {
      display.drawMonster(monster);
    });
  }

  public redraw() {
    this.display.clean();
    this.draw();
  }

  public exec(event: string) {
    const speed = 1;
    switch (event) {
      case 'moveUp':
        this.defender.position.add(0, -speed);
        break;
      case 'moveDown':
        this.defender.position.add(0, speed);
        break;
      case 'moveRight':
        this.defender.position.add(speed, 0);
        break;
      case 'moveLeft':
        this.defender.position.add(-speed, 0);
        break;
    }
    this.redraw();
  }
}

export default function game(context: any, monsterData: any[]): Game {
  const d = monsterData.shift();
  const defender = new Defender(
    new Position(d.x, d.y),
    new CharacterShape(d.img, d.w, d.h)
  );
  const monsters = monsterData.map(({img, x, y, w, h}) => {
    return new Monster(
      new Position(x, y),
      new CharacterShape(img, w, h)
    );
  });
  const display = new Display(context, new Position(0, 0));
  return new Game(display, defender, monsters);
}


/*
class RoundFrame {
  protected x: number;
  protected y: number;
  protected r: number;

  constructor(x: number, y: number, r: number) {
    this.x = x;
    this.y = y;
    this.r = r;
  }
}





export class Display {
  private soldier: Soldier;

  constructor(soldier: Soldier) {
    this.soldier = soldier;
  }


}
*/
