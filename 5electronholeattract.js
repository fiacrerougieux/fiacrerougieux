let leftSide, rightSide, topSide, bottomSide, middle, spring, k, a, electronMembrane, holeMembrane, metal;
let photons = [];
let holes = [];
let electrons = [];

function setup() {
  initialise();
  let electron1 = new Electron(middlex-10,middle-10, k, electrons);       
  electrons.push(electron1);
  let electron2 = new Electron(middlex+10,middle-10, k, electrons);       
  electrons.push(electron2);
  let hole1 = new Hole(middlex+10,middle+10, k, holes);       
  holes.push(hole1);
  let hole2 = new Hole(middlex-10,middle+10, k, holes);       
  holes.push(hole2);
}

function draw() {
  displayCellElements(1,0,0,0);
  displayLegend(0,1,1,0,0,0,0);
  electronHoleInteraction(0.008,2.5,0);
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