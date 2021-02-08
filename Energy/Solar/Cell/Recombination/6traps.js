let leftSide, rightSide, topSide, bottomSide, middle, spring, k, a, electronMembrane, holeMembrane, metal, pvx, pvy;
let photons = [];
let holes = [];
let electrons = [];
let phonons = [];
let electronTraps = []
let holeTraps = []

function setup() {
  initialise();
  reset();
}

function reset() {
  let electron1 = new Electron(leftSide+20,middle+20, k, electrons,1,0);       
  electrons.push(electron1);
  let hole1 = new Hole(rightSide-20,middle+20, k, holes,-1,0);       
  holes.push(hole1);
  let electron2 = new Electron(leftSide+20,middle-20, k, electrons,2,0);       
  electrons.push(electron2);
  let hole2 = new Hole(rightSide-20,middle-20, k, holes,-2,0);       
  holes.push(hole2);
  let electronTrap = new ElectronTrap(rightSide-30,middle);
  electronTraps.push(electronTrap);
  let holeTrap = new HoleTrap(leftSide+30,middle);
  holeTraps.push(holeTrap);
}

function draw() {
  displayCellElements(1,0,0,0);
  displayLegend(0,1,1,0,0,0,0,0,0,0,0,0,0,1,1);
  electronHoleInteraction(0.008,2.5,0,1);
  electronElectronTrapInteraction(0.008);
  holeHoleTrapInteraction(0.008);
  for (let i = 0; i < photons.length; i++) {
    photons[i].move();
    photons[i].display();
  }
  phonons.forEach(phonon => {
    phonon.move();
    phonon.display();
  });
  removePhonons();
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
  electronTraps.forEach(electronTrap => {
    electronTrap.emit();
    electronTrap.display();
  });
  holeTraps.forEach(holeTrap => {
    holeTrap.emit();
    holeTrap.display();
  });
}

