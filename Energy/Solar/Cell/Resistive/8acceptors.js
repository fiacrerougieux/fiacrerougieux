let leftSide, rightSide, topSide, bottomSide, middle, spring, k, a, electronMembrane, holeMembrane, metal, angle, rotationSpeed, pyramids, monofacial, rx, ry;
let photons = [];
let holes = [];
let electrons = [];
let donors = [];
let acceptors = [];

function setup() {
  initialise();
  for (let k = 0; k < 20; k++) {
    rx = random(leftSide,rightSide);
    ry = random(topSide,bottomSide);
    acceptors.push(new Acceptor(rx,ry));
    holes.push(new Hole(rx,ry,k, holes));
  }
}

function draw() {
  displayCellElements(1,0,0,0);
  displayLegend(0,1,1,0,0,0,0,0,0,0,0,1,0);
  holeAcceptorInteraction(0.00000000008);
  holes.forEach(hole => {
    hole.collide();
    hole.move();
    hole.display();
  });
  acceptors.forEach(acceptor => {
    acceptor.display();
  });
}