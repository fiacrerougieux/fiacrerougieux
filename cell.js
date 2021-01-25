let photons = [];
let holes = [];
let electrons = [];
let leftSide;
let rightSide;
let topSide;
let bottomSide;
let middle;
let electronIsRecombining = [];
let holeIsRecombining = [];
let spring = 0.05;
let springeh = 0.05;
let k;
let a;

function setup() {
  var canvas = createCanvas(500, 280);
  canvas.parent('canvasForHTML');
  // Initialise colors
  fill(255,255,255);
  rect(-2, -2, width+2, height+2);
  photonColor = color(255, 255, 255);
  electronColor = color(216, 31, 42);
  let electronCloudColor = color(216, 31, 42);
  electronCloudColor.setAlpha(10); 
  holeColor = color(0, 126, 163);
  absorberColor = color(163, 163, 163);
  electronMembraneColor = color(231, 104, 209);
  holeMembraneColor = color(110, 121, 224);
  metalColor = color(98, 101, 112);
  leftSide = width/8;
  rightSide = width-width/8;
  topSide = height/4;
  bottomSide = topSide+100;
  middle = (topSide + bottomSide)/2
  // Create object
  for (let i = 0; i < 10; i++) {
    let photon = new         Photon(random(leftSide,rightSide),random(-1000,0),
      i,
      photons)
    photons.push(photon);
  }
  k=0;
  
}

function draw() {
  stroke(255,0);
  fill(20,20,20);
  rect(-20, -20, width+20, height+20);
  // Create Absorber
  stroke(absorberColor);
  fill(absorberColor);
  rect(leftSide-5, topSide-5, rightSide-leftSide+10, bottomSide-topSide+10);
  stroke(electronMembraneColor);
  fill(electronMembraneColor);
  rect(leftSide-5, topSide-5, rightSide-leftSide+10, 14);
  stroke(holeMembraneColor);
  fill(holeMembraneColor);
  rect(leftSide-5, bottomSide-8, rightSide-leftSide+10, 14);
  stroke(metalColor);
  fill(metalColor);
  rect(rightSide-35, topSide-26, 40, 20);
  rect(rightSide, topSide-11, 40, 5);
  rect(rightSide+40, topSide-11, 5, bottomSide - topSide + 23);
  rect(rightSide, bottomSide+7, 40, 5);
  rect(rightSide-35, bottomSide+7, 40, 20);
  stroke(255)
  let offset = width/2-80
  fill(photonColor);
  ellipse(offset+10, height-40, 10, 10);
  fill(electronColor);
  ellipse(offset+10, height-25, 10, 10);
  fill(holeColor);
  ellipse(offset+10, height-10, 10, 10);
  stroke(absorberColor);
  fill(absorberColor);
  rect(offset+80, height-60, 10, 10);
  stroke(electronMembraneColor);
  fill(electronMembraneColor);
  rect(offset+80, height-45, 10, 10);
  stroke(holeMembraneColor);
  fill(holeMembraneColor);
  rect(offset+80, height-30, 10, 10);
  stroke(metalColor);
  fill(metalColor);
  rect(offset+80, height-15, 10, 10);
  fill(255)
  stroke(0)
  text('Photon',offset+ 20, height-36);
  text('Electron', offset+20, height-21);
  text('Hole', offset+20, height-6);
  text('Absorber', offset+100, height-49);
  text('Electron Membrane', offset+100, height-36);
  text('Hole Membrane', offset+100, height-21);
  text('Metal Contact', offset+100, height-6);
  // Create photons
  for (let i = 0; i < photons.length; i++) {
    photons[i].move();
    photons[i].display();
  }
  
  for (let j = electrons.length-1; j >= 0; j--) {
    for (let i = holes.length-1; i >= 0; i--) {
        if (random(1)>0.9) {

          let dx = holes[i].x - electrons[j].x;
          let dy = holes[i].y - electrons[j].y;
          let distance = sqrt(dx * dx + dy * dy);
          let minDist = holes[i].diameter + electrons[j].diameter;
          //console.log(distance);
          //console.log(minDist);
          if ((distance < minDist)&&(random(1)>0.92)) {
            let angle = atan2(dy, dx);
            let targetX = electrons[j].x + cos(angle) * minDist;
            let targetY = electrons[j].y + sin(angle) * minDist;
            let ax = (targetX - holes[i].x) * springeh;
            let ay = (targetY - holes[i].y) * springeh;
            electrons[j].vx = -ax;
            electrons[j].vy = -ay;
            holes[i].vx = +ax;
            holes[i].vy = +ay;
            if (random(1)>0.5) {
              holes.splice(i,1);
              electrons.splice(j,1);
              i=0;
              j=0;
            }
          }
        }
    }
  }
  
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

// Particle class
class Particle {
  constructor(xinit,yinit) {
    this.x = xinit;
    this.y = yinit;
    this.diameter = 10;
    this.speed = 1;
  }
}

// Carrier class
class Photon extends Particle { 
  constructor(xinit,yinit) {
    super(xinit,yinit);
    this.vx = 0;
    this.vy = 2;
  }
  move() {
    this.y += this.vy;
    if (this.y == topSide) {
      if (random(1)>0.5) {
        this.vy = -this.vy
      }
    }
    if ((this.y > topSide-28)&&(this.x > rightSide-35)) {
      this.vy = -this.vy
    }
    if (this.y > middle) {
      k = k+1
      let hole = new Hole(this.x,this.y,
      k,
      holes);       
      holes.push(hole);
      let electron = new Electron(this.x,this.y,
      k,
      electrons);       
      electrons.push(electron);
      electronIsRecombining.push(0);
      holeIsRecombining.push(0);
      this.y = -1000;
    }
  if (this.y < -1100) {
    this.vy = -this.vy;
    this.y = -1000;
  }
  }
  display() {
    stroke(255,0);
    for (let j = 1; j <100; j++) {
        fill(255,60-j*2);
        ellipse(this.x, this.y-this.vy*j, this.diameter, this.diameter);
    }
    fill(255,255);
    ellipse(this.x, this.y-0.6, this.diameter, this.diameter);
  }
}

// Carrier class
class Carrier extends Particle { 
  constructor(xinit,yinit) {
    super(xinit,yinit);
    this.x = xinit;
    this.y = yinit;
    this.vx = random(-this.speed, this.speed);
    this.vy = random(-this.speed, this.speed);
    this.electronMembrane = 0;
    this.holeMembrane = 0;
    this.electronMetal = 0;
    this.electronWire = 0;
  }
}

class Electron extends Carrier { 
  constructor(xinit,yinit, idin, oin) {
    super(xinit,yinit);
    this.id = idin;
    this.others = oin;
  }
  recombine() {

    }
  collide() {
    for (let i = this.id + 1; i < electrons.length; i++) {
      //console.log(this.others[i]);
      let dx = this.others[i].x - this.x;
      let dy = this.others[i].y - this.y;
      let distance = sqrt(dx * dx + dy * dy);
      let minDist = this.others[i].diameter + this.diameter;
      //console.log(distance);
      //console.log(minDist);
      if (distance < minDist) {
        //console.log("2");
        let angle = atan2(dy, dx);
        let targetX = this.x + cos(angle) * minDist;
        let targetY = this.y + sin(angle) * minDist;
        let ax = (targetX - this.others[i].x) * spring;
        let ay = (targetY - this.others[i].y) * spring;
        this.vx -= ax;
        this.vy -= ay;
        this.others[i].vx += ax;
        this.others[i].vy += ay;
      }
    }
    }
    move() {
    if (this.electronWire == 0) {
      if (this.electronMetal == 0) {
        if (this.y < topSide + 2) {this.electronMembrane = 1}
        if ((this.y < topSide + 2)&&(this.x > rightSide - 30)) {this.electronMetal = 1}
        if (this.x<leftSide) {this.x = leftSide, this.vx = -this.vx}
        if (this.electronMembrane == 0) {
          if (this.x>rightSide) {this.x = rightSide, this.vx = -this.vx}
          if (this.y<topSide) {this.y = topSide, this.vy = -this.vy}
          if (this.y>bottomSide-9) {this.y = bottomSide-9, this.vy = -this.vy}
        }
      }


        if (this.electronMembrane == 1) {
          this.vy = 0;
        }

      if (this.electronMetal == 1) {
        if (this.x < rightSide + 43) {
          this.y = topSide - 8;
          this.vy = 1;
          if (this.x < rightSide - 30) {this.x = rightSide - 30}
        }
        if (this.x >= rightSide + 43) {
            this.x = rightSide + 43;
          if (this.y<bottomSide+9) {
            this.vy = 1;
            this.vx = 0;
          }
          if (this.y>=bottomSide+9) {
            this.electronWire = 1;
          }
        }
      }
    }
    if (this.electronWire == 1) {
        this.vy = 0;
        this.vx = -1;
        if (this.x<rightSide-20) {
            this.vx = 0;
        }
    }


    
    this.x += this.vx;
    this.y += this.vy;
  }
  display() {
    stroke(255,0);
    fill(255,20);
    ellipse(this.x, this.y, this.diameter+10, this.diameter+10);
    stroke(255);
    fill(electronColor);
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}

class Hole extends Carrier { 
  constructor(xinit,yinit, idin, oin) {
    super(xinit,yinit);
    this.id = idin;
    this.others = oin;
  }
  recombine() {
    //console.log((isrecombining[this.id]==1));
    //console.log(isrecombining);
    //if (isrecombining[this.id]==1) {
    //  electrons.slice(this.id,1)
    //}

  }
  collide() {
    for (let i = this.id + 1; i < holes.length; i++) {
      //console.log(this.others[i]);
      let dx = this.others[i].x - this.x;
      let dy = this.others[i].y - this.y;
      let distance = sqrt(dx * dx + dy * dy);
      let minDist = this.others[i].diameter + this.diameter;
      //console.log(distance);
      //console.log(minDist);
      if (distance < minDist) {
        //console.log("2");
        let angle = atan2(dy, dx);
        let targetX = this.x + cos(angle) * minDist;
        let targetY = this.y + sin(angle) * minDist;
        let ax = (targetX - this.others[i].x) * spring;
        let ay = (targetY - this.others[i].y) * spring;
        this.vx -= ax;
        this.vy -= ay;
        this.others[i].vx += ax;
        this.others[i].vy += ay;
      }
    }
  }
  move() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.y > bottomSide - 2) {this.holeMembrane = 1}
    if (this.x<leftSide) {this.x = leftSide, this.vx = -this.vx}
    if (this.x>rightSide) {this.x = rightSide, this.vx = -this.vx}
    if (this.holeMembrane == 0) {
      if (this.y<topSide) {this.y = topSide, this.vy = -this.vy}
      if (this.y>bottomSide) {this.y = bottomSide, this.vy = -this.vy}
      if (this.y<topSide+9) {this.y = topSide+9, this.vy = -this.vy}
    }
    if (this.holeMembrane == 1) {
      this.vy = 0;
    }
  }
  display() {
    stroke(255,0);
    fill(255,20);
    ellipse(this.x, this.y, this.diameter+10, this.diameter+10);
    stroke(255);
    fill(holeColor);
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}