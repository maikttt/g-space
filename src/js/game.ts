
import { IMonster, IDefender, IDisplay, ILandscape, IBullet } from './base';
import { Bullet } from './characters';
import { charactersHaveCollision } from './collisions';

interface IBulletTime {
  bullet: IBullet;
  lunchTime: number;
}


export class Game {
  private display: IDisplay;
  private landscape: ILandscape;
  private defender: IDefender;
  private monsters: IMonster[];

  private bullets: IBulletTime[] = [];
  private _run_timer: any = false;
  private delay: number = 50;
  private bulletLifeTime = 2e3; // ms

  constructor(display: IDisplay, landscape: ILandscape, defender: IDefender, monsters: IMonster[]) {
    this.display = display;
    this.landscape = landscape;
    this.defender = defender;
    this.monsters = monsters;
  }

  public exec(event: string, ...args: any) {
    const speed = 8;
    switch (event) {
      case 'shut':
        this.bullets.push({
          lunchTime: Date.now(),
          bullet: this.defender.shut(),
        });
        break;
      case 'moveUp':
        this.defender.movePosition(0, -speed);
        this.display.setCenter(this.defender.position);
        break;
      case 'moveDown':
        this.defender.movePosition(0, speed);
        this.display.setCenter(this.defender.position);
        break;
      case 'moveRight':
        this.defender.movePosition(speed, 0);
        this.display.setCenter(this.defender.position);
        break;
      case 'moveLeft':
        this.defender.movePosition(-speed, 0);
        this.display.setCenter(this.defender.position);
        break;
      case 'move':
        this.defender.move(speed);
        this.display.setCenter(this.defender.position);
        break;
      case 'defenderChangeDir':
        this.defender.direction.setFromAbsoluteXY(
          this.display.getAbsoluteX(args[0]) - this.defender.position.x,
          this.display.getAbsoluteY(args[1]) - this.defender.position.y,
        );
        break;
    }
    this.redraw();
  }

  private draw() {
    const { display } = this;
    display.drawLandscape(this.landscape);
    this.bullets.forEach(({ bullet }) => {
      display.drawCharacter(bullet);
    });
    display.drawCharacter(this.defender);
    this.monsters.forEach((monster) => {
      display.drawCharacter(monster);
    });
  }

  public redraw() {
    this.display.clean();
    this.draw();
  }

  private ticUpdate() {
    this.tic_detectCollisions();
    this.tic_checkBulletsLife();

    this.monsters.forEach((monster) => {
      monster.move();
    });
    this.bullets.forEach(({ bullet }) => {
      bullet.move();
    });
  }

  private tic_checkBulletsLife() {
    const now = Date.now();
    this.bullets = this.bullets.filter(({ lunchTime }) => {
      return now - lunchTime <= this.bulletLifeTime;
    });
  }

  private tic_detectCollisions() {
    let c_monsters = new Set();
    let c_bullets  = new Set();

    charactersHaveCollision(this.monsters, this.bullets.map(b => b.bullet))
    .forEach(([monster_index, bullet_index]) => {
      c_monsters.add(monster_index);
      c_bullets.add(bullet_index);
    });
    this.bullets = this.bullets.filter((_, index) => !c_bullets.has(index));
  }

  public run() {
    this.abort();
    this.ticUpdate();
    this.redraw();
    this._run_timer = setTimeout(() => {
      this._run_timer = false;
      this.run();
    }, this.delay);
  }

  abort() {
    if (this._run_timer) {
      clearTimeout(this._run_timer);
      this._run_timer = false;
    }
  }
}

