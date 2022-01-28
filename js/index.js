const drawBackground = new Image();
drawBackground.src = './images/road.png';

const drawCar = new Image();
drawCar.src = './images/car.png';

window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };
  
  function startGame() {
    myGameArea.start();
  }
};

const myGameArea = {
  canvas: document.getElementById('canvas'),
  frames: 0,
  carPosX: 210,
  carPosY: 560,

  start: function() {
    this.ctx = this.canvas.getContext('2d')
    this.interval = setInterval(updateGameArea, 16)
  },

  clear: function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },

  background: function() {
    this.ctx.drawImage(drawBackground, 0, 0, this.canvas.width, this.canvas.height);
  },

  car: function () {
    this.ctx.drawImage(drawCar, this.carPosX, this.carPosY, 80, 120);
  },
}

function updateGameArea() {
  myGameArea.clear();
  myGameArea.background();
  myGameArea.car();
  updateObstacles();
  
};

function updateObstacles(){
  for (let i = 0; i< myObstacles.length; i++){
      myObstacles[i].x -= 1
      myObstacles[i].update();
  }


  myGameArea.frames += 1;

  if (myGameArea.frames % 120 === 0) {
      let x = myGameArea.canvas.width;
      let y = myGameArea.canvas.height;
      let minHeight = 40;
      let maxHeight = 300;

      let height = Math.floor(Math.random() * (maxHeight-minHeight) + minHeight);

      let minGap = 50;
      let maxGap = 200;

      let gap = Math.floor(Math.random() * (maxGap - minGap) + minGap);

      myObstacles.push(new Component(30, height, 'green', x, 0))
      myObstacles.push(new Component(30, x - height - gap, 'green', x, height + gap))
  }
}

document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowLeft':
      myGameArea.carPosX -= 25;
      break;
    case 'ArrowRight':
      myGameArea.carPosX += 25;
      break;
  }

});
