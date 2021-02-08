let leftSide, rightSide, topSide, bottomSide, middle, spring, k, a, electronMembrane, holeMembrane, metal, angle, rotationSpeed, pyramids, monofacial;
let photons = [];
let holes = [];
let electrons = [];

function setup() {
  initialise();
  let electron1 = new Electron(middlex-10,middle-10,
      k,
      electrons);       
      electrons.push(electron1);
  let electron2 = new Electron(middlex-10,middle+10,
      k,
      electrons);       
      electrons.push(electron2);
  let electron3 = new Electron(middlex+10,middle-10,
      k,
      electrons);       
      electrons.push(electron3);
  let electron4 = new Electron(middlex+10,middle+10,
      k,
      electrons);       
      electrons.push(electron4);
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