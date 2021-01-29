let leftSide, rightSide, topSide, bottomSide, middle, spring, k, a, electronMembrane, holeMembrane, metal;
let photons = [];
let holes = [];
let electrons = [];
let donors = [];

function setup() {
  initialise();
  let electron1 = new Electron(leftSide+10,middle,k,electrons);       
  electrons.push(electron1);
  let electron2 = new Electron(leftSide+20,middle,k,electrons);       
  electrons.push(electron2);
  let electron3 = new Electron(leftSide+30,middle,k,electrons);       
  electrons.push(electron3);
  let donor1 = new Donor(leftSide+25,middle);
  donors.push(donor1);
  let donor2 = new Donor(middlex,middle);
  donors.push(donor2);
  let donor3 = new Donor(rightSide-25,middle);
  donors.push(donor3);
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