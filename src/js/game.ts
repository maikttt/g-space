
import { IMonster, IDefender, IDisplay, ILandscape } from './base';

export class Game {
  private display: IDisplay;
  private landscape: ILandscape;
  private defender: IDefender;
  private monsters: IMonster[];

  private _run_timer: any = false;
  private delay: 50;

  constructor(display: IDisplay, landscape: ILandscape, defender: IDefender, monsters: IMonster[]) {
    this.display = display;
    this.landscape = landscape;
    this.defender = defender;
    this.monsters = monsters;
  }

  private draw() {
    const { display } = this;
    display.setCenter(this.defender.position);
    display.drawLandscape(this.landscape);
    display.drawCharacter(this.defender);
    this.monsters.forEach((monster) => {
      display.drawCharacter(monster);
    });
  }

  public redraw() {
    this.display.clean();
    this.draw();
  }

  public exec(event: string) {
    const speed = 1;
    this.monsters.forEach((monster) => {
      monster.move();
    });
    switch (event) {
      case 'moveUp':
        this.defender.move(0, -speed);
        break;
      case 'moveDown':
        this.defender.move(0, speed);
        break;
      case 'moveRight':
        this.defender.move(speed, 0);
        break;
      case 'moveLeft':
        this.defender.move(-speed, 0);
        break;
    }
    this.redraw();
  }

  public run() {
    this.abort();
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

