let leftSide, rightSide, topSide, bottomSide, middle, spring, k, a, electronMembrane, holeMembrane, metal;
let photons = [];
let holes = [];
let electrons = [];

function setup() {
  initialise();
  let electron = new Electron(middlex,middle,k,electrons);       
  electrons.push(electron);
}

function draw() {
  displayCellElements(1,0,0,0);
  displayLegend(0,1,0,0,0,0,0);
  electrons.forEach(electron => {
    electron.collide();
    electron.move();
    electron.display();
  });
}