let leftSide, rightSide, topSide, bottomSide, middle, spring, k, a, electronMembrane, holeMembrane, metal, angle, rotationSpeed, pyramids, monofacial;
let photons = [];
let holes = [];
let electrons = [];
let load;

function setup() {
  initialise();
  load = new Fan();
  electronMembrane = 1;
  holeMembrane = 1;
  metal = 1;
  reset();
}

function reset() {
    let pvx = 0;
    let pvy = sqrt(2-pvx*pvx);
    let photon = new Photon(random(leftSide,rightSide), 0,pvx,pvy, photons);
    photon.wavelength = random(300,800);
    photons.push(photon);
}

function draw() {
  if(frameCount % 30 === 0){
    reset();
  }
  displayCellElements(1,1,1,1);
  displayLegend(1,1,1,1,1,1,1);
  electronHoleInteraction(0.001,1.5,0.02);
  load.display();
  generation();
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

