let distances = [];
let resetdistances = [];
let maxDistance;
let spacer;
let rule;
let offset = 0.3331;
let slider;

function setup() {
  var canvas = createCanvas(700, 360);
  canvas.parent('canvasForHTML');
  spacer = 10;
  newset();
  distances[int(width/spacer/2)-1][0] = 1;
  fill(20,20,20);
  rect(-2, -2, width+4, height+4);


  let button = select('#start');
  button.mousePressed(reset);
  slider = select('#offsetSlider');
}

function draw() {
  if(frameCount % 5 === 0){
    offset = slider.value()/1000;
    fill(20,20,20);
    rect(-2, -2, width+4, height+4);
    stroke(0,0,0);
    fill(0,150,0);
    display();
    moveDown();
    applyRule();
  }
}

function newset() {
    for (let x = 0; x <= (width/spacer); x += 1) {
    distances[x] = []; // create nested array
    resetdistances[x] = [];
    for (let y = 0; y < (height/spacer); y += 1) {
      distances[x][y] = 0;
      resetdistances[x][y] = 0;
    }
  }
}

function reset() {
    for (let x = 0; x <= (width/spacer); x += 1) {
    for (let y = 0; y < (height/spacer); y += 1) {
      distances[x][y] = 0;
      distances[int(width/spacer/2)-1][0] = 1;
    }
  }
}

function display() {
  for (let x = 0; x < (width/spacer); x += 1) {
      for (let y = 0; y < (height/spacer); y += 1) {
          fill(0,150*distances[x][y],0);
          square(x*spacer, y*spacer,8,2);
      }
    }
}

function moveDown() {
    for (let y = (height/spacer); y >= 0; y--) {
    for (let x = 0; x < (width/spacer); x++) {
      distances[x][y+1] = distances[x][y]
    }
  }
}

function applyRule() {
    for (let x = 1; x < (width/spacer)-1; x++) {
        distances[x][0] = ((distances[x-1][1]+distances[x][1]+distances[x+1][1]) + offset)%1;
    }
    // x = 0  
    distances[0][0] = ((distances[width/spacer][1]+distances[0][1]+distances[1][1])+offset)%1;

    // x = width/spacer
    distances[width/spacer][0]= ((distances[width/spacer-1][1]+distances[width/spacer][1]+distances[0][1])+offset)%1;
}
