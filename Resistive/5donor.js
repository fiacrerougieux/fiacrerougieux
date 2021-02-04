let leftSide, rightSide, topSide, bottomSide, middle, spring, k, a, electronMembrane, holeMembrane, metal, angle, rotationSpeed, pyramids, monofacial;
let photons = [];
let holes = [];
let electrons = [];
let donors = [];

function setup() {
  initialise();
  let donor = new Donor(middlex,middle);
  donors.push(donor);
  let electron = new Electron(middlex,middle, k, electrons);       
  electrons.push(electron);
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