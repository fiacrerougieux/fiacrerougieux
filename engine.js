// Particle class
class Particle {
  constructor(xinit,yinit) {
    this.x = xinit;
    this.y = yinit;
    this.diameter = 10;
    this.speed = 2;
  }
}


// Photon class
class Photon extends Particle { 
  constructor(xinit,yinit, vxinit, vyinit) {
    super(xinit,yinit);
    this.vx = vxinit;
    this.vy = vyinit;
    this.reflectionProbabilityFraction=0.05;
  }
  move() {
    if ((this.y>topSide-2)&&(this.y<topSide+2)&&(random(1)>(1-this.reflectionProbabilityFraction))) {
      this.vy = -this.vy;
    }
    if (pyramids==1) {
      let peak1 = (rightSide-leftSide-35)/4+20;
      let through1 = (rightSide-leftSide-35)/2+20;
      let peak2 = 3*(rightSide-leftSide-35)/4+20;
      let through2 = (rightSide-leftSide-35)+20;
      if (this.x<=peak1) {
        if ((this.y>122-this.x)&&(this.y<=124-this.x)) {this.vx=1}           
      }
      if ((this.x>peak1)&&(this.x<=through1)) {
        if ((this.y>this.x-95)&&(this.y<=this.x-93)) {this.vx=-1}            
      }
      if ((this.x>through1)&&(this.x<=peak2)) {
        if ((this.y>288-this.x)&&(this.y<=290-this.x)) {this.vx=1}            
      }
      if ((this.x>peak2)&&(this.x<=through2)) {
        if ((this.y>this.x-300)&&(this.y<=this.x-298)) {this.vx=-1}          
      }
    }
    this.x += this.vx;
    this.y += this.vy;
  }
  display() {
    stroke(255,0);
    fill(255,255);
    ellipse(this.x, this.y-0.6, this.diameter, this.diameter);
  }
}

// Phonon class
class Phonon extends Particle { 
  constructor(xinit,yinit, vxinit, vyinit) {
    super(xinit,yinit);
    this.diameter = 4;
    this.vx = vxinit;
    this.vy = vyinit;
  }
  move() {
    if (this.x<leftSide) {this.x = leftSide, this.vx = -this.vx}
    if (this.x>rightSide) {this.x = rightSide, this.vx = -this.vx}
    if (this.y<topSide) {this.y = topSide, this.vy = -this.vy}
    if (this.y>bottomSide) {this.y = bottomSide, this.vy = -this.vy}
    this.x += this.vx;
    this.y += this.vy;
  }
  display() {
    stroke(255,0);
    fill(255,255,0);
    ellipse(this.x, this.y-0.6, this.diameter, this.diameter);
  }
}

// Carrier class
class Carrier extends Particle { 
  constructor(xinit,yinit, vxinit=random(-2, 2), vyinit=random(-2, 2)) {
    super(xinit,yinit);
    this.x = xinit;
    this.y = yinit;
    this.vx = vxinit;
    this.vy = vyinit;
    this.electronMembrane = 0;
    this.holeMembrane = 0;
    this.electronMetal = 0;
    this.electronWire = 0;
  }
}

class Electron extends Carrier { 
  constructor(xinit,yinit, idin, oin, vxinit, vyinit) {
    super(xinit,yinit, vxinit, vyinit);
    this.id = idin;
    this.others = oin;
    this.charge = -1;
    this.potential = 0;
    this.hot = 0;
  }
  collide() {
    for (let i = this.id + 1; i < electrons.length; i++) {
      let dx = this.others[i].x - this.x;
      let dy = this.others[i].y - this.y;
      let distance = sqrt(dx * dx + dy * dy);
      let minDist = 1.5*(this.others[i].diameter + this.diameter);
      if ((distance < minDist)&&((this.x<rightSide)&&(this.y<bottomSide-4))) {
        let angle = atan2(dy, dx);
        let targetX = this.x + cos(angle) * minDist;
        let targetY = this.y + sin(angle) * minDist;
        let ax = (targetX - this.others[i].x) * spring;
        let ay = (targetY - this.others[i].y) * spring;
        this.vx -= ax;
        this.vy -= ay;
        this.others[i].vx += ax;
        this.others[i].vy += ay;
        let potentialAverage = round((this.potential + this.others[i].potential)/2);
        this.potential = potentialAverage;
        this.others[i].potential = potentialAverage;
      }
    }
    }
    move() {
    if (this.x<leftSide) {this.x = leftSide, this.vx = -this.vx}
    if ((electronMembrane==1)&&(this.y<topSide+2)&&(this.vx>4)) {this.vx = 1}

    if ((metal===0)) {
        if (this.x>rightSide) {this.x = rightSide, this.vx = -this.vx}
        if ((electronMembrane==1)&&(this.y<topSide+2)) {this.vy=0}
        if (this.y<topSide) {this.y = topSide, this.vy = -this.vy}
        if (this.y>bottomSide) {this.y = bottomSide, this.vy = -this.vy}
        if ((holeMembrane==1)&&(this.y>bottomSide-9)) {this.vy=-this.vy,this.y=bottomSide-9}
    }
    if ((metal==1)) {
        if ((electronMembrane==1)&&(this.y<topSide+2)&&(this.x > rightSide - 43)) {this.vy=-random(2),this.vx=+random(2)}
        if ((this.y>bottomSide+10)&&(this.x >= rightSide + 43)) {this.y = bottomSide+10, this.vy = 0, this.vx = -2}
        if ((this.x>rightSide)&&(this.x<rightSide+43)&&(this.y>topSide+1)&&(this.y<bottomSide-1)) {this.x = rightSide, this.vx = -this.vx}
        if (this.x>rightSide+43) {this.x = rightSide+43, this.vx = 0, this.vy = 2, rotationSpeed = rotationSpeed + 0.03}
        if ((holeMembrane==1)&&(this.y>bottomSide-9)&&(this.x<rightSide-20)) {this.vy=-this.vy,this.y=bottomSide-9}
        if ((this.y>=bottomSide+10)&&(this.x < rightSide - 5)) {this.y = bottomSide+11+random(2), this.x = rightSide-10+random(2), this.vy = 0, this.vx = 0}
        if ((this.y<topSide-10)&&(this.x >= rightSide - 33)) {this.y = topSide-10, this.vy = -this.vy}
        if (pyramids==0) {
          if ((electronMembrane==1)&&(this.y<topSide+2)&&(this.x < rightSide - 33)) {this.vy=0}
          if ((this.y<topSide)&&(this.x < rightSide - 33)) {this.y = topSide, this.vy = -this.vy}
        }
        if ((electronMembrane==1)&&(pyramids==1)) {
          let peak1 = (rightSide-leftSide-35)/4+20;
          let through1 = (rightSide-leftSide-35)/2+20;
          let peak2 = 3*(rightSide-leftSide-35)/4+20;
          let through2 = (rightSide-leftSide-35)+20;
          if (this.x<=peak1) {
            if ((electronMembrane==1)&&(this.y<=140-this.x)) {this.vy=0,this.y=130-this.x}           
          }
          if ((this.x>peak1)&&(this.x<=through1)) {
            if ((this.y<=this.x-85)) {this.vy=0,this.y=this.x-95}           
          }
          if ((this.x>through1)&&(this.x<=peak2)) {
            if ((this.y<=310-this.x)) {this.vy=0,this.y=300-this.x}           
          }
          if ((this.x>peak2)&&(this.x<=through2)) {
            if ((this.y<=this.x-260)) {this.vy=0,this.y=this.x-270}           
          }
        }
    }
    if (this.vx>4) {this.vx = 4}
    if (this.vy>4) {this.vy = 4}
    this.x += this.vx;
    this.y += this.vy;
  }
  display() {
    if (this.hot==1) {
      stroke(255,0);
      fill(255,255,0);
      ellipse(this.x, this.y, this.diameter+5, this.diameter+3);
      if(frameCount % 120 === 0){
        for (let l = 0; l < 10; l++) { 
          pvx = random(-1,1);
          pvy = random(-1,1);
          let phonon = new Phonon(this.x, this.y,pvx,pvy, phonons);
          phonons.push(phonon);
        }
        this.hot=0;
      }
    }
    stroke(255,0);
    fill(255,20);
    ellipse(this.x, this.y, this.diameter+10, this.diameter+10);
    stroke(255);
    fill(color(255-this.potential, 0, 0));
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}

class Hole extends Carrier { 
  constructor(xinit,yinit, idin, oin, vxinit, vyinit) {
    super(xinit,yinit,vxinit, vyinit);
    this.id = idin;
    this.others = oin;
    this.charge = +1;
  }
  collide() {
    for (let i = this.id + 1; i < holes.length; i++) {
      //console.log(this.others[i]);
      let dx = this.others[i].x - this.x;
      let dy = this.others[i].y - this.y;
      let distance = sqrt(dx * dx + dy * dy);
      let minDist = 1.5*(this.others[i].diameter + this.diameter);
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
    if (this.x<leftSide) {this.x = leftSide, this.vx = -this.vx}
    if (this.x>rightSide) {this.x = rightSide, this.vx = -this.vx}
    if (this.y<topSide) {this.y = topSide, this.vy = -this.vy}
    if (this.y>bottomSide) {this.y = bottomSide, this.vy = -this.vy}
    if ((electronMembrane==1)&&(this.y<topSide+9)) {this.vy=-this.vy,this.y=topSide+9}
    if ((holeMembrane==1)&&(this.y>bottomSide-2)) {this.vy=0}
    if ((holeMembrane==1)&&(this.y>bottomSide-2)&&(this.vx>4)) {this.vx = 1}
    if (this.vx>4) {this.vx = 4}
    if (this.vy>4) {this.vy = 4}
    this.x += this.vx;
    this.y += this.vy;
  }
  slow() {
    if ((holeMembrane==1)&&(this.y>bottomSide-2)&&(this.vx>0.2)) {this.vy=0,this.vx=this.vx/2}
    if ((holeMembrane==1)&&(this.y>bottomSide-2)&&(this.vx<-0.2)) {this.vy=0,this.vx=this.vx/2}
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

// The load is a fan which turns
class Fan {
    constructor() {
        this.speed = 2;
    }
    display() {
        if (rotationSpeed>3) {rotationSpeed = 3}
        rotationAngle = rotationAngle + rotationSpeed;
        fill(211, 211, 211);
        stroke(211, 211, 211);
        push();
        translate(rightSide+43,(topSide+bottomSide)/2);
        rotate(radians(rotationAngle));
        beginShape();
            vertex(-5, 5);
            vertex(0, 25);
            vertex(5, 5);
            vertex(25, 0);
            vertex(5, -4);
            vertex(0, -25);
            vertex(-5, -4);
            vertex(-25, 0);
        endShape();
        pop();
    }
}

// Impurity class
class Impurity {
  constructor(xinit,yinit) {
    this.x = xinit;
    this.y = yinit;
    this.diameter = 15;
    this.crossSection = 55;
  }
}

// Electron Trap class
class ElectronTrap extends Impurity { 
  constructor(xinit,yinit) {
    super(xinit,yinit);
    this.charge = 0;
  }
  emit() {
    if((frameCount % 100 === 0)&&(this.charge==-1)){
      let electron = new Electron(this.x-3,this.y+3, k, electrons);       
      electrons.push(electron);
      this.charge = -0.5;
    }
    if((frameCount % 97 === 0)&&(this.charge==-0.5)){
      this.charge = 0;
    }
  }
  display() {
    if ((this.charge==0)||(this.charge==-0.5)) {
      stroke(electronColor);
      fill(255,50);
      ellipse(this.x, this.y-0.6, this.crossSection, this.crossSection);
      stroke(255);
      fill(180);
      ellipse(this.x, this.y-0.6, this.diameter, this.diameter);
    }
    if (this.charge==-1) {
      stroke(255);
      fill(electronColor);
      ellipse(this.x, this.y-0.6, this.diameter, this.diameter);
    }
  }
}

// Hole Trap class
class HoleTrap extends Impurity { 
  constructor(xinit,yinit) {
    super(xinit,yinit);
    this.charge = 0;
  }
  emit() {
    if((frameCount % 100 === 0)&&(this.charge==1)){
      let hole = new Hole(this.x-3,this.y+3, k, holes);       
      holes.push(hole);
      this.charge = 0.5;
    }
    if((frameCount % 97 === 0)&&(this.charge==0.5)){
      this.charge = 0;
    }
  }
  display() {
    if ((this.charge==0)||(this.charge==0.5)) {
      stroke(holeColor);
      fill(255,50);
      ellipse(this.x, this.y-0.6, this.crossSection, this.crossSection);
      stroke(255);
      fill(180);
      ellipse(this.x, this.y-0.6, this.diameter, this.diameter);
    }
    if (this.charge==1) {
      stroke(255);
      fill(holeColor);
      ellipse(this.x, this.y-0.6, this.diameter, this.diameter);
    }
  }
}

// Recombination Centre class
class RecombinationCentre extends Impurity { 
  constructor(xinit,yinit) {
    super(xinit,yinit);
    this.charge = 0;
  }
  display() {
    if (this.charge==0) {
      stroke(electronColor);
      fill(255,50);
      ellipse(this.x, this.y-0.6, this.crossSection, this.crossSection);
      stroke(255);
      fill(180);
      ellipse(this.x, this.y-0.6, this.diameter, this.diameter);
    }
    if (this.charge==-1) {
      stroke(holeColor);
      fill(255,50);
      ellipse(this.x, this.y-0.6, this.crossSection, this.crossSection);
      stroke(255);
      fill(electronColor);
      ellipse(this.x, this.y-0.6, this.diameter, this.diameter);
    }
  }
}

// Donor class
class Donor extends Impurity { 
  constructor(xinit,yinit) {
    super(xinit,yinit);
  }
  display() {
    stroke(255,60);
    fill(255,50);
    ellipse(this.x, this.y-0.6, this.crossSection, this.crossSection);
    stroke(255);
    fill(holeColor);
    ellipse(this.x, this.y-0.6, this.diameter, this.diameter);
  }
}

// Acceptor class
class Acceptor extends Impurity { 
  constructor(xinit,yinit) {
    super(xinit,yinit);
  }
  display() {
    stroke(255,60);
    fill(255,50);
    ellipse(this.x, this.y-0.6, this.crossSection, this.crossSection);
    stroke(255);
    fill(electronColor);
    ellipse(this.x, this.y-0.6, this.diameter, this.diameter);
  }
}