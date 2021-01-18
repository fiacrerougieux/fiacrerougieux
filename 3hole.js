let leftSide, rightSide, topSide, bottomSide, middle, spring, k, a, electronMembrane, holeMembrane, metal;
let photons = [];
let holes = [];
let electrons = [];

function setup() {
  initialise();
  let hole = new Hole(middlex,middle,
      k,
      holes);       
      holes.push(hole);
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