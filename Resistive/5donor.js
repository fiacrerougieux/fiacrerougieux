let leftSide, rightSide, topSide, bottomSide, middle, spring, k, a, electronMembrane, holeMembrane, metal;
let photons = [];
let holes = [];
let electrons = [];
let donors = [];

function setup() {
  initialise();
  let electron = new Electron(leftSide+10,middle,k,electrons);       
  electrons.push(electron);
  let donor = new Donor(middlex,middle);
  donors.push(donor);
}

function draw() {
  displayCellElements(1,0,0,0);
  displayLegend(0,1,1,0,0,0,0);
  electronDonorInteraction(0.008);
  electrons.forEach(electron => {
    electron.collide();
    electron.move();
    electron.display();
  });
  donors.forEach(donor => {
    donor.display();
  });
}