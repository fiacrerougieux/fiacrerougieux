let leftSide, rightSide, topSide, bottomSide, middle, spring, k, a, electronMembrane, holeMembrane, metal, angle, rotationSpeed, pyramids, monofacial;
let photons = [];
let holes = [];
let electrons = [];

function setup() {
  initialise();
  let hole1 = new Hole(middlex-10,middle-10,
      k,
      holes);       
      holes.push(hole1);
  let hole2 = new Hole(middlex-10,middle+10,
      k,
      holes);       
      holes.push(hole2);
  let hole3 = new Hole(middlex+10,middle-10,
      k,
      holes);       
      holes.push(hole3);
  let hole4 = new Hole(middlex+10,middle+10,
      k,
      holes);       
      holes.push(hole4);
}

function draw() {
  displayCellElements(1,0,0,0);
  displayLegend(0,1,1,0,0,0,0);
  holes.forEach(hole => {
    hole.collide();
    hole.move();
    hole.display();
  });
}