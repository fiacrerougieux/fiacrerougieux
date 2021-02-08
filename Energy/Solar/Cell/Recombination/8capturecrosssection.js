let leftSide, rightSide, topSide, bottomSide, middle, spring, k, a, electronMembrane, holeMembrane, metal, pvx, pvy;
let photons = [];
let holes = [];
let electrons = [];
let phonons = [];
let electronTraps = [];
let holeTraps = [];
let recombinationCentres = [];

function setup() {
  initialise();
  let recombinationCentre = new RecombinationCentre(middlex,middle);
  recombinationCentre.crossSection = 100;
  recombinationCentres.push(recombinationCentre);
  reset();
}

function reset() {
  let electron1 = new Electron(leftSide,middle, k, electrons,random(1,2),random(-0.2,0.2));       
  electrons.push(electron1);
  let hole1 = new Hole(rightSide,middle, k, holes,random(-2,-1),random(-0.2,0.2));       
  holes.push(hole1);
}

function draw() {
  if(frameCount % 260 === 0){
    reset();
  }
  displayCellElements(1,0,0,0);
  displayLegend(0,1,1,0,0,0,0,0,0,0,0,0,0,1,1);
  electronHoleInteraction(0.008,2.5,0,1);
  carrierRecombinationCentreInteraction(0.008);
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
  recombinationCentres.forEach(recombinationCentre => {
    recombinationCentre.display();
  });
}

