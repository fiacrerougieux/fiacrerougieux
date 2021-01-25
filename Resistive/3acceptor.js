let leftSide, rightSide, topSide, bottomSide, middle, spring, k, a, electronMembrane, holeMembrane, metal;
let photons = [];
let holes = [];
let electrons = [];
let donors = [];
let acceptors = [];

function setup() {
  initialise();
  let hole = new Hole(leftSide+10,middle,k,electrons);       
  holes.push(hole);
  let acceptor = new Acceptor(middlex,middle);
  acceptors.push(acceptor);
}

function draw() {
  displayCellElements(1,0,0,0);
  displayLegend(0,1,0,0,0,0,0);
  holeAcceptorInteraction(0.008);
  holes.forEach(hole => {
    hole.collide();
    hole.move();
    hole.display();
  });
  acceptors.forEach(acceptor => {
    acceptor.display();
  });
}