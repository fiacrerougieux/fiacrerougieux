let leftSide, rightSide, topSide, bottomSide, middle, spring, k, a, electronMembrane, holeMembrane, metal;
let photons = [];
let holes = [];
let electrons = [];

function setup() {
  initialise();
  reset();
  let button = select('#start');
  button.mousePressed(reset);
}

function reset() {
  let electron1 = new Electron(leftSide+10,middle+10, k, electrons);       
  electrons.push(electron1);
  let hole1 = new Hole(rightSide-10,middle+10, k, holes);       
  holes.push(hole1);
  let electron2 = new Electron(leftSide+10,middle-10, k, electrons);       
  electrons.push(electron2);
  let hole2 = new Hole(rightSide-10,middle-10, k, holes);       
  holes.push(hole2);
}

function draw() {
  displayCellElements(1,0,0,0);
  displayLegend(0,1,1,0,0,0,0);
  electronHoleInteraction(0.008,2.5,0.07);
  for (let i = 0; i < photons.length; i++) {
    photons[i].move();
    photons[i].display();
  }
  electrons.forEach(electron => {
    electron.collide();
    electron.move();
    electron.display();
  });
  holes.forEach(hole => {
    hole.collide();
    hole.move();
    hole.display();
  });
}

