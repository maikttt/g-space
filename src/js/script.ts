

import game from './classes';

const canvas = document.getElementById('display');
const context = canvas.getContext('2d');

const KEY_MAP = {
  ArrowUp: 'moveUp',
  ArrowDown: 'moveDown',
  ArrowLeft: 'moveLeft',
  ArrowRight: 'moveRight',
};

Promise.all([
  'dist/img/defender.png',
  'dist/img/monster-0.png',
  'dist/img/monster-1.png',
  'dist/img/monster-2.png',
].map((src) => loadImage(src)))
.then((images) => {
  const monsters = images.map((image) => ({
    img: image,
    x: random(400),
    y: random(400),
    w: 40,
    h: 40
  }));
  const app = game(context, monsters);
  app.redraw();

  document.body.addEventListener('keydown', function(event) {
    const action = event.key ? KEY_MAP[event.key] : undefined;
    if (action) {
      app.exec(action);
    }
  });
})
.catch((error) => {
    console.log(error);
});



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
