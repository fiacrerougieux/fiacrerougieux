let leftSide, rightSide, topSide, bottomSide, middle, spring, k, a, electronMembrane, holeMembrane, metal, angle, rotationSpeed, pyramids, monofacial;
let photons = [];
let holes = [];
let electrons = [];
let donors = [];
let acceptors = [];

function setup() {
  initialise();
  let acceptor = new Acceptor(middlex,middle);
  acceptors.push(acceptor);
  let hole = new Hole(middlex,middle, k, electrons);       
  holes.push(hole);
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