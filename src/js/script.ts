import makeGame from './game-factory';

const canvas = document.getElementById('display') as HTMLCanvasElement;
const context = canvas.getContext('2d');

const KEY_MAP: { [name: string]: string } = {
  'KeyW': 'moveUp',
  'KeyS': 'moveDown',
  'KeyA': 'moveLeft',
  'KeyD': 'moveRight',
  'Space': 'move',
};

Promise.all([
  'dist/img/field.jpg',
  'dist/img/defender.png',
  'dist/img/defender-bullet.png',
  'dist/img/monster-0.png',
  'dist/img/monster-1.png',
  'dist/img/monster-2.png',
].map((src) => loadImage(src)))
.then(([fieldImg, defenderImg, bulletImg, ...monstersImgs]: HTMLImageElement[]) => {
  const field = {
    img: fieldImg,
    w: fieldImg.width,
    h: fieldImg.height,
  };
  const defender = {
    img: defenderImg,
    w: 60,
    h: 60,
    x: 0,
    y: 0
  };
  const bullet = {
    img: bulletImg,
    w: bulletImg.width,
    h: bulletImg.height,
    speed: 16,
  }
  const monsters = monstersImgs.map((img) => {
    return {
      img, w: 60, h: 60,
      x: random(400) - 200,
      y: random(400) - 200,
      r: random(50)  + 50,
    };
  });

  const game = makeGame(context, field, defender, monsters, bullet);
  game.run();

  /*
  const monsters = images.map((image) => ({
    img: image,
    x: random(400),
    y: random(400),
    w: 40,
    h: 40
  }));
  const app = game(context, monsters);
  app.redraw();
  */
  document.body.addEventListener('keydown', function(event) {
    const action = event.key ? KEY_MAP[event.code] : '';
    if (action) {
      game.exec(action);
    }
  });

  canvas.addEventListener('mousemove', function(event: MouseEvent) {
    game.exec('defenderChangeDir', event.offsetX, event.offsetY);
  });
  canvas.addEventListener('click', function(event) {
    game.exec('shut');
  });
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
})
.catch((error) => {
  console.log(error);
});

function resizeCanvas() {
  const { innerHeight, innerWidth } = window;
  canvas.width = innerWidth - 20;
  canvas.height = innerHeight - 20;
}

function loadImage(src: string) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      resolve(image);
    };
    image.onerror = (err) => {
      console.log(err);
      reject();
    };
    image.src = src;
  });
}

function random(max: number) {
  return Math.floor(Math.random() * max);
}
/*
const canvas = document.getElementById('display');
const context = canvas.getContext('2d');

const image = new Image();
image.onload = () => {
  draw();
};
image.onerror = (err) => {
  alert('error');
};
image.src = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.protectorfiresafety.com%2F11895-large_default%2Frestricted-area.jpg&f=1&nofb=1';

function draw() {
  context.beginPath();
  context.rect(0, 0, 500, 500);
  context.fill();

  context.setTransform(1, 0, 0, 1, 200, 200);
  context.rotate(Math.PI / 4);
  context.drawImage(image, -75, -75, 150, 150);



  context.setTransform(1, 0, 0, 1, 0, 0);
  context.rotate(0);
  context.beginPath();
  context.rect(195, 195, 10, 10);
  context.fillStyle = 'yellow';
  context.fill();
}
*/
