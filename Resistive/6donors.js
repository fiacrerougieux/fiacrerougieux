let leftSide, rightSide, topSide, bottomSide, middle, spring, k, a, electronMembrane, holeMembrane, metal, angle, rotationSpeed, pyramids, monofacial, rx, ry;
let photons = [];
let holes = [];
let electrons = [];
let donors = [];

function setup() {
  initialise();
  for (let k = 0; k < 20; k++) {
    rx = random(leftSide,rightSide);
    ry = random(topSide,bottomSide);
    donors.push(new Donor(rx,ry));
    electrons.push(new Electron(rx,ry,k, electrons));
  }
}

function draw() {
  displayCellElements(1,0,0,0);
  displayLegend(0,1,1,0,0,0,0,0,0,0,0,0,1);
  electronDonorInteraction(0.00000000008);
  electrons.forEach(electron => {
    electron.collide();
    electron.move();
    electron.display();
  });
  donors.forEach(donor => {
    donor.display();
  });
}