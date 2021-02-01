let leftSide, rightSide, topSide, bottomSide, middle, spring, k, a, electronMembrane, holeMembrane, metal, angle, rotationSpeed, pyramids, monofacial;
let photons = [];
let holes = [];
let electrons = [];
let donors = [];
let acceptors = [];

function setup() {
  initialise();
  let hole1 = new Hole(leftSide+10,middle,k,holes);       
  holes.push(hole1);
  let hole2 = new Hole(leftSide+20,middle,k,holes);       
  holes.push(hole2);
  let hole3 = new Hole(leftSide+30,middle,k,holes);       
  holes.push(hole3);
  let acceptor1 = new Acceptor(leftSide+25,middle);
  acceptors.push(acceptor1);
  let acceptor2 = new Acceptor(middlex,middle);
  acceptors.push(acceptor2);
  let acceptor3 = new Acceptor(rightSide-25,middle);
  acceptors.push(acceptor3);
}

function draw() {
  displayCellElements(1,0,0,0);
  displayLegend(0,1,1,0,0,0,0);
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