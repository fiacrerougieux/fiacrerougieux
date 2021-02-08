let leftSide, rightSide, topSide, bottomSide, middle, spring, k, a, electronMembrane, holeMembrane, metal, pvx, pvy;
let photons = [];
let holes = [];
let electrons = [];
let phonons = [];

function setup() {
  initialise();
  reset();
}

function reset() {
  let rd3 = random(1);
  if (rd3>0.5) {
  let electron1 = new Electron(leftSide,middle, k, electrons,1,0);       
  electrons.push(electron1);
  let electron2 = new Electron(rightSide,bottomSide-10, k, electrons,-1,-0.18);       
  electrons.push(electron2);
  let hole1 = new Hole(rightSide,topSide+10, k, holes,-1,0.18);       
  holes.push(hole1);
  }
  if (rd3<=0.5) {
  let hole1 = new Hole(leftSide,middle, k, holes,1,0);       
  holes.push(hole1);
  let hole2 = new Hole(rightSide,bottomSide-10, k, holes,-1,-0.18);       
  holes.push(hole2);
  let electron1 = new Electron(rightSide,topSide+10, k, electrons,-1,0.18);       
  electrons.push(electron1);
  }
}

function draw() {
  if(frameCount % 500 == 0){
    reset();
  }
  displayCellElements(1,0,0,0);
  displayLegend(1,1,1,0,0,0,0,1,1,1);
  electronHoleInteraction(0.008,2.5,0.4,0);
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
}

