// Initialise
function initialise(leftSideDividerInit=16, rightBufferInit = 60, topSideDividerInit = 4.5, thicknessInit=100) {
    var canvas = createCanvas(500, 280);
    canvas.parent('canvasForHTML');
    // Initialise colors
    fill(255,255,255);
    rect(-2, -2, width+2, height+2);
    photonColor = color(255, 255, 255);
    electronColor = color(216, 31, 42);
    holeColor = color(0, 126, 163);
    absorberColor = color(163, 163, 163);
    electronMembraneColor = color(231, 104, 209);
    holeMembraneColor = color(110, 121, 224);
    metalColor = color(98, 101, 112);
    ARCColor = color(0,255,0)
    leftSide = width/leftSideDividerInit;
    rightSide = width-leftSide-rightBufferInit;
    topSide = height/topSideDividerInit;
    bottomSide = topSide+thicknessInit;
    middle = (topSide + bottomSide)/2;
    middlex = (leftSide + rightSide)/2;
    electronMembrane = 0;
    holeMembrane = 0;
    metal = 0;
    pyramids = 0;
    spring = 0.05;
    k=0;
    rotationAngle = 0;
    rotationSpeed = 0;
    monofacial = 0;
}

function generation (generationProbabilityFraction=0.04,bandgapWavelength=1100,hotCarriers=0) {
    for (let i = photons.length-1; i >= 0; i--) {
    photons[i].move();
    photons[i].display();
    if ((photons[i].y>topSide)&&(photons[i].y<bottomSide)&&(random(1)>(1-generationProbabilityFraction))&&(photons[i].wavelength<bandgapWavelength)) {
        let electron = new Electron(photons[i].x,photons[i].y, k, electrons);       
        if (hotCarriers==1) {
          electron.hot = 1;
        }
        electrons.push(electron);
        let hole = new Hole(photons[i].x,photons[i].y, k, holes);       
        if (hotCarriers==1) {
          hole.hot = 1;
        }
        holes.push(hole);
        photons.splice(i,1);
    }
  }
}

function electronHoleElectronAuger(interactionStrength,interactionLength,recombinationProbabilityFraction) {
// Electron Hole interaction
  for (let j = electrons.length-1; j >= 0; j--) {
    for (let i = holes.length-1; i >= 0; i--) {
      for (let k = j-1; k >= 0; k--) {
        let dx1 = holes[i].x - electrons[j].x;
        let dy1 = holes[i].y - electrons[j].y;
        let distance1 = sqrt(dx1 * dx1 + dy1 * dy1);
        let dx2 = holes[i].x - electrons[k].x;
        let dy2 = holes[i].y - electrons[k].y;
        let distance2 = sqrt(dx2 * dx2 + dy2 * dy2);
        let minDist = interactionLength*(holes[i].diameter + electrons[j].diameter);
        if ((distance1 < minDist)&&(electrons[j].y<bottomSide-4)) {
            let angle = atan2(dy1, dx1);
            let targetX = electrons[j].x + cos(angle) * minDist;
            let targetY = electrons[j].y + sin(angle) * minDist;
            let ax = (targetX - holes[i].x) * interactionStrength;
            let ay = (targetY - holes[i].y) * interactionStrength;
            electrons[j].vx += ax;
            electrons[j].vy += ay;
            holes[i].vx -= ax;
            holes[i].vy -= ay;
            electrons[j].x += electrons[j].vx;
            electrons[j].y += electrons[j].vy;
            holes[i].x += holes[i].vx;
            holes[i].y += holes[i].vy;
          }
        if ((distance1 < minDist)&&(distance2 < minDist)&&((random(1)>(1-recombinationProbabilityFraction))||(electrons[j].y>bottomSide+10))) {
          if ((electrons[k].y<bottomSide)) {
            electrons[k].hot = 1;
          }
          holes.splice(i,1);
          electrons.splice(j,1);
          i=0;
          j=0;
          k=0;
        }
      }
    }
  }
}

function holeElectronHoleAuger(interactionStrength,interactionLength,recombinationProbabilityFraction) {
// Electron Hole interaction
  for (let j = holes.length-1; j >= 0; j--) {
    for (let i = electrons.length-1; i >= 0; i--) {
      for (let k = j-1; k >= 0; k--) {
        let dx1 = electrons[i].x - holes[j].x;
        let dy1 = electrons[i].y - holes[j].y;
        let distance1 = sqrt(dx1 * dx1 + dy1 * dy1);
        let dx2 = electrons[i].x - holes[k].x;
        let dy2 = electrons[i].y - holes[k].y;
        let distance2 = sqrt(dx2 * dx2 + dy2 * dy2);
        let minDist = interactionLength*(electrons[i].diameter + holes[j].diameter);
        if ((distance1 < minDist)&&(electrons[i].y<bottomSide-4)) {
            let angle = atan2(dy1, dx1);
            let targetX = holes[j].x + cos(angle) * minDist;
            let targetY = holes[j].y + sin(angle) * minDist;
            let ax = (targetX - holes[i].x) * interactionStrength;
            let ay = (targetY - holes[i].y) * interactionStrength;
            holes[j].vx += ax;
            holes[j].vy += ay;
            electrons[i].vx -= ax;
            electrons[i].vy -= ay;
            holes[j].x += holes[j].vx;
            holes[j].y += holes[j].vy;
            electrons[i].x += electrons[i].vx;
            electrons[i].y += electrons[i].vy;
          }
        if ((distance1 < minDist)&&(distance2 < minDist)&&((random(1)>(1-recombinationProbabilityFraction)))) {
          if ((holes[k].y<bottomSide)) {
            holes[k].hot = 1;
          }
          electrons.splice(i,1);
          holes.splice(j,1);
          i=0;
          j=0;
          k=0;
        }
      }
    }
  }
}

function electronHoleInteraction(interactionStrength,interactionLength,recombinationProbabilityFraction,radiativeAugerRatio=1) {
let rd = random(1);
if(rd<radiativeAugerRatio) {
  for (let j = electrons.length-1; j >= 0; j--) {
    for (let i = holes.length-1; i >= 0; i--) {
          let dx = holes[i].x - electrons[j].x;
          let dy = holes[i].y - electrons[j].y;
          console.log(electrons.length)
          console.log(dy)
          let distance = sqrt(dx * dx + dy * dy);
          let minDist = interactionLength*(holes[i].diameter + electrons[j].diameter);
          if ((distance < minDist)&&(electrons[j].y<bottomSide-4)) {
            let angle = atan2(dy, dx);
            let targetX = electrons[j].x + cos(angle) * minDist;
            let targetY = electrons[j].y + sin(angle) * minDist;
            let ax = (targetX - holes[i].x) * interactionStrength;
            let ay = (targetY - holes[i].y) * interactionStrength;
            electrons[j].vx += ax;
            electrons[j].vy += ay;
            holes[i].vx -= ax;
            holes[i].vy -= ay;
            electrons[j].x += electrons[j].vx;
            electrons[j].y += electrons[j].vy;
            holes[i].x += holes[i].vx;
            holes[i].y += holes[i].vy;
          }
          if ((distance < minDist)&&((random(1)>(1-recombinationProbabilityFraction))||(electrons[j].y>bottomSide+10))) {
              if ((electrons[j].y<bottomSide)) {
                  let pvx = random(-2,2);
                  let pvy = sqrt(2-pvx*pvx);
                  if (random(1)>0.5) {
                      pvy = -pvy;
                  }
                  let photon = new Photon((holes[i].x+electrons[i].x)/2, (holes[i].y+electrons[j].y)/2,pvx,pvy, photons);
                  photons.push(photon);
              }
              holes.splice(i,1);
              electrons.splice(j,1);
              i=0;
              j=0;
            }
      }
    }
}
if (rd>=radiativeAugerRatio) {
  let rd2 = random(1);
  if (rd2<0.5) {
    holeElectronHoleAuger(interactionStrength,interactionLength,recombinationProbabilityFraction);
  }
  if (rd2>=0.5) {
    electronHoleElectronAuger(interactionStrength,interactionLength,recombinationProbabilityFraction);
  }

}
}

// Delete phonons
function removePhonons() {
  for (let j = phonons.length-1; j >= 0; j--) {
    if((phonons[j].x<leftSide)||(phonons[j].x>rightSide)||(phonons[j].y<topSide)||(phonons[j].y>bottomSide)) {
      phonons.splice(j,1);
    }
  }
}

// Electron Electron Trap interaction
function electronElectronTrapInteraction(interactionStrength) {
    for (let j = electrons.length-1; j >= 0; j--) {
        for (let i = electronTraps.length-1; i >= 0; i--) {
          if (electronTraps[i].charge == 0) {
            let dx = electronTraps[i].x - electrons[j].x;
            let dy = electronTraps[i].y - electrons[j].y;
            let distance = sqrt(dx * dx + dy * dy);
            let minDist = electronTraps[i].crossSection;
            if ((distance < minDist)&&(electrons[j].y<bottomSide-4)) {
                let angle = atan2(dy, dx);
                let targetX = electrons[j].x + cos(angle) * minDist;
                let targetY = electrons[j].y + sin(angle) * minDist;
                let ax = (targetX - electronTraps[i].x) * interactionStrength;
                let ay = (targetY - electronTraps[i].y) * interactionStrength;
                electrons[j].vx += ax;
                electrons[j].vy += ay;
                electrons[j].x += electrons[j].vx;
                electrons[j].y += electrons[j].vy;
            }
            if ((distance < minDist/3)&&(electrons[j].y<bottomSide-4)) {
              electrons.splice(j,1);
              electronTraps[i].charge = -1;
            }
          }

        }
    }
}

// Hole Hole Trap interaction
function holeHoleTrapInteraction(interactionStrength) {
    for (let j = holes.length-1; j >= 0; j--) {
        for (let i = holeTraps.length-1; i >= 0; i--) {
          if (holeTraps[i].charge == 0) {
            let dx = holeTraps[i].x - holes[j].x;
            let dy = holeTraps[i].y - holes[j].y;
            let distance = sqrt(dx * dx + dy * dy);
            let minDist = holeTraps[i].crossSection;
            if ((distance < minDist)&&(holes[j].y<bottomSide-4)) {
                let angle = atan2(dy, dx);
                let targetX = holes[j].x + cos(angle) * minDist;
                let targetY = holes[j].y + sin(angle) * minDist;
                let ax = (targetX - holeTraps[i].x) * interactionStrength;
                let ay = (targetY - holeTraps[i].y) * interactionStrength;
                holes[j].vx += ax;
                holes[j].vy += ay;
                holes[j].x += holes[j].vx;
                holes[j].y += holes[j].vy;
            }
            if ((distance < minDist/3)&&(holes[j].y<bottomSide-4)) {
              holes.splice(j,1);
              holeTraps[i].charge = 1;
            }
          }

        }
    }
}

// Carrier Recombination Centre interaction
function carrierRecombinationCentreInteraction(interactionStrength) {
    for (let j = electrons.length-1; j >= 0; j--) {
        for (let i = recombinationCentres.length-1; i >= 0; i--) {
          if (recombinationCentres[i].charge == 0) {
            let dx = recombinationCentres[i].x - electrons[j].x;
            let dy = recombinationCentres[i].y - electrons[j].y;
            let distance = sqrt(dx * dx + dy * dy);
            let minDist = recombinationCentres[i].crossSection;
            if ((distance < minDist)&&(electrons[j].y<bottomSide-4)) {
                let angle = atan2(dy, dx);
                let targetX = electrons[j].x + cos(angle) * minDist;
                let targetY = electrons[j].y + sin(angle) * minDist;
                let ax = (targetX - recombinationCentres[i].x) * interactionStrength;
                let ay = (targetY - recombinationCentres[i].y) * interactionStrength;
                electrons[j].vx += ax;
                electrons[j].vy += ay;
                electrons[j].x += electrons[j].vx;
                electrons[j].y += electrons[j].vy;
            }
            if ((distance < minDist/3)&&(electrons[j].y<bottomSide-4)) {
              electrons.splice(j,1);
              recombinationCentres[i].charge = -1;
            }
          }

        }
    }
    for (let j = holes.length-1; j >= 0; j--) {
        for (let i = recombinationCentres.length-1; i >= 0; i--) {
          if (recombinationCentres[i].charge == -1) {
            let dx = recombinationCentres[i].x - holes[j].x;
            let dy = recombinationCentres[i].y - holes[j].y;
            let distance = sqrt(dx * dx + dy * dy);
            let minDist = recombinationCentres[i].crossSection;
            if ((distance < minDist)&&(holes[j].y<bottomSide-4)) {
                let angle = atan2(dy, dx);
                let targetX = holes[j].x + cos(angle) * minDist;
                let targetY = holes[j].y + sin(angle) * minDist;
                let ax = (targetX - recombinationCentres[i].x) * interactionStrength;
                let ay = (targetY - recombinationCentres[i].y) * interactionStrength;
                holes[j].vx += ax;
                holes[j].vy += ay;
                holes[j].x += holes[j].vx;
                holes[j].y += holes[j].vy;
            }
            if ((distance < minDist/3)&&(holes[j].y<bottomSide-4)) {
              holes.splice(j,1);
              recombinationCentres[i].charge = 0;
            }
          }

        }
    }
}

// Electron Donor interaction
function electronDonorInteraction(interactionStrength) {
    for (let j = electrons.length-1; j >= 0; j--) {
        for (let i = donors.length-1; i >= 0; i--) {
            let dx = donors[i].x - electrons[j].x;
            let dy = donors[i].y - electrons[j].y;
            let distance = sqrt(dx * dx + dy * dy);
            let minDist = donors[i].crossSection + electrons[j].diameter;
            if ((distance < minDist)&&(electrons[i].y<bottomSide-4)) {
                let angle = atan2(dy, dx);
                let targetX = electrons[j].x + cos(angle) * minDist;
                let targetY = electrons[j].y + sin(angle) * minDist;
                let ax = (targetX - donors[i].x) * interactionStrength;
                let ay = (targetY - donors[i].y) * interactionStrength;
                electrons[j].vx += ax;
                electrons[j].vy += ay;
                electrons[j].x += electrons[i].vx;
                electrons[j].y += electrons[i].vy;
            }
        }
    }
}

// Hole Acceptor interaction
function holeAcceptorInteraction(interactionStrength) {
    for (let j = holes.length-1; j >= 0; j--) {
        for (let i = acceptors.length-1; i >= 0; i--) {
            let dx = acceptors[i].x - holes[j].x;
            let dy = acceptors[i].y - holes[j].y;
            let distance = sqrt(dx * dx + dy * dy);
            let minDist = acceptors[i].crossSection + holes[j].diameter;
            if ((distance < minDist)&&(holes[i].y<bottomSide-4)) {
                let angle = atan2(dy, dx);
                let targetX = holes[j].x + cos(angle) * minDist;
                let targetY = holes[j].y + sin(angle) * minDist;
                let ax = (targetX - acceptors[i].x) * interactionStrength;
                let ay = (targetY - acceptors[i].y) * interactionStrength;
                holes[j].vx += ax;
                holes[j].vy += ay;
                holes[j].x += holes[i].vx;
                holes[j].y += holes[i].vy;
            }
        }
    }
}

// Electron Donor interaction
function electronPhononInteraction(interactionProbabilityFraction) {
    for (let j = electrons.length-1; j >= 0; j--) {
        for (let i = phonons.length-1; i >= 0; i--) {
            let dx = phonons[i].x - electrons[j].x;
            let dy = phonons[i].y - electrons[j].y;
            let distance = sqrt(dx * dx + dy * dy);
            let minDist = electrons[j].diameter;
            if ((distance < minDist)&&(random(1)>(1-interactionProbabilityFraction))) {
              electrons[j].potential = electrons[j].potential + 3
            }
            if (electrons[j].potential>200) {
              electrons[j].potential = 200;
            }
        }
    }
}

// Delete Electron on the Right Side
function deleteElectronRight() {
    for (let j = electrons.length-1; j >= 0; j--) {
      if (electrons[j].x>rightSide-2) {
        electrons.splice(j,1);
      }
    }
}

// Cell elements
function displayCellElements(displayAbsorber=1,displayElectronMembrane=1,displayHoleMembrane=1,displayMetal=1,displayFrontAntiReflectionCoating=0,displayPyramids=0,displayAbsorberAsMetal=0,metalWidth=40,metalHeight=20,displayRearAntiReflectionCoating=0,displayRearPERC=0) {
    stroke(255,0);
    fill(20,20,20);
    rect(-20, -20, width+20, height+20);
    
    if (displayAbsorber==1) {
      stroke(absorberColor);
      fill(absorberColor);
      rect(leftSide-5, topSide-5, rightSide-leftSide+10, bottomSide-topSide+10);
  }
  
    if (displayAbsorberAsMetal==1) {
      stroke(metalColor);
      fill(metalColor);
      rect(leftSide-5, topSide-5, rightSide-leftSide+10, bottomSide-topSide+10);
  }

      if (displayElectronMembrane==1) {
      stroke(electronMembraneColor);
      fill(electronMembraneColor);
      rect(leftSide-5, topSide-5, rightSide-leftSide+10, 14);
  }
  
      if (displayHoleMembrane==1) {
      stroke(holeMembraneColor);
      fill(holeMembraneColor);
      rect(leftSide-5, bottomSide-8, rightSide-leftSide+10, 14);
  }
  
  if (displayFrontAntiReflectionCoating==1) {
      stroke(ARCColor);
      fill(ARCColor);
      rect(leftSide-5, topSide-15, rightSide-leftSide+10, 9);
  }

  if (displayRearAntiReflectionCoating==1) {
      stroke(ARCColor);
      fill(ARCColor);
      rect(leftSide-5, bottomSide+7, rightSide-leftSide+10, 4);
  }

  if (displayRearPERC==1) {
      stroke(ARCColor);
      fill(ARCColor);
      rect(leftSide-5, bottomSide+7, rightSide-leftSide+10, 10);
      stroke(metalColor);
      fill(metalColor);
      rect(leftSide-5, bottomSide+17, rightSide-leftSide+10, 15);
  }

  if (displayPyramids==1) {
      let peak1 = (rightSide-leftSide-35)/4;
      let through1 = (rightSide-leftSide-35)/2;
      let peak2 = 3*(rightSide-leftSide-35)/4;
      let through2 = (rightSide-leftSide-35);
      let pyramidHeight = 85;
      if (displayFrontAntiReflectionCoating==1) {
        stroke(ARCColor);
        fill(ARCColor);
        push();
        translate(leftSide,topSide-9);
        beginShape();
          vertex(-4, -5);
          vertex(peak1, -5-pyramidHeight);
          vertex(through1, -5);
          vertex(peak2, -5-pyramidHeight);
          vertex(through2, -5);
          vertex(through2, 9);
          vertex(-4, 9);
        endShape();
        pop();
      }
      stroke(absorberColor);
      fill(absorberColor);
      push();
      translate(leftSide,topSide);
      beginShape();
        vertex(-4, -5);
        vertex(peak1, -5-pyramidHeight);
        vertex(through1, -5);
        vertex(peak2, -5-pyramidHeight);
        vertex(through2, -5);
        vertex(through2, 9);
        vertex(-4, 9);
      endShape();
      pop();
    if (displayHoleMembrane==1) {
      stroke(electronMembraneColor);
      fill(electronMembraneColor);
      push();
      translate(leftSide,topSide);
      beginShape();
        vertex(-4, -5);
        vertex(peak1, -5-pyramidHeight);
        vertex(through1, -5);
        vertex(peak2, -5-pyramidHeight);
        vertex(through2, -5);
        vertex(through2, 9);
        vertex(-4, 9);
      endShape();
      pop();
      stroke(absorberColor);
      fill(absorberColor);
      push();
      translate(leftSide,topSide+14);
      beginShape();
        vertex(-4, -5);
        vertex(peak1, -5-pyramidHeight);
        vertex(through1, -5);
        vertex(peak2, -5-pyramidHeight);
        vertex(through2, -5);
        vertex(through2, 9);
        vertex(-4, 9);
      endShape();
      pop();
    }
  }

      if (displayMetal==1) {
      stroke(metalColor);
      fill(metalColor);
      rect(rightSide-metalWidth+5, topSide-metalHeight-6, metalWidth, metalHeight);
      rect(rightSide, topSide-11, 40, 5);
      rect(rightSide+40, topSide-11, 5, bottomSide - topSide + 23);
      rect(rightSide, bottomSide+7, 40, 5);
      rect(rightSide-35, bottomSide+7, 40, 20);
  }

}

// Legend
function displayLegend(displayPhoton=1,displayElectron=1,displayHole=1,displayAbsorber=1,displayElectronMembrane=1,displayHoleMembrane=1,displayMetal=1,displayPhonon=0,displayHotElectron=0,displayHotHole=0,displayAntiReflectionCoating=0,displayAcceptor=0,displayDonor=0,displayElectronTrap=0,displayHoleTrap=0) {
  let offset = 10;

  let row1offset = 20;
  if (displayPhoton==1) {
      stroke(255);
      fill(photonColor);
      ellipse(offset+row1offset, height-40, 10, 10);
      fill(255);
      stroke(0);
      text('Photon',offset+row1offset+10, height-36);
  }
  
    if (displayElectron==1) {
      stroke(255);
      fill(electronColor);
      ellipse(offset+row1offset, height-25, 10, 10);
      fill(255);
      stroke(0);
      text('Electron', offset+row1offset+10, height-21);
  }
  
    if (displayHole==1) {
      stroke(255);
      fill(holeColor);
      ellipse(offset+row1offset, height-10, 10, 10);
      fill(255);
      stroke(0);
      text('Hole', offset+row1offset+10, height-6);
  }
  
  let row2offset = 90;
  if (displayPhonon==1) {
      stroke(255,0);
      fill(255,255,0);
      ellipse(offset+row2offset, height-40, 4, 4);
      fill(255);
      stroke(0);
      text('Phonon', offset+row2offset+10, height-36);
  }

    if (displayHotElectron==1) {
      stroke(255,0);
      fill(255,255,0);
      ellipse(offset+row2offset, height-25, 13, 13);
      stroke(255);
      fill(electronColor);
      ellipse(offset+row2offset, height-25, 10, 10);
      fill(255);
      stroke(0);
      text('Hot Electron', offset+row2offset+10, height-21);
  }
  
    if (displayHotHole==1) {
      stroke(255,0);
      fill(255,255,0);
      ellipse(offset+row2offset, height-10, 13, 13);
      stroke(255);
      fill(holeColor);
      ellipse(offset+row2offset, height-10, 10, 10);
      fill(255);
      stroke(0);
      text('Hot Hole', offset+row2offset+10, height-6);
  }

  if (displayAcceptor==1) {
      stroke(255,60);
      fill(255,50);
      ellipse(offset+row2offset+30, height-30, 55, 55);
      stroke(255);
      fill(electronColor);
      ellipse(offset+row2offset+30, height-30, 15, 15);
      fill(255);
      stroke(0);
      text('Acceptor', offset+row2offset+60, height-26);
  }

  if (displayDonor==1) {
      stroke(255,60);
      fill(255,50);
      ellipse(offset+row2offset+150, height-30, 55, 55);
      stroke(255);
      fill(holeColor);
      ellipse(offset+row2offset+150, height-30, 15, 15);
      fill(255);
      stroke(0);
      text('Donor', offset+row2offset+180, height-26);
  }

  if (displayElectronTrap==1) {
      stroke(electronColor);
      fill(255,50);
      ellipse(offset+row2offset+30, height-30, 55, 55);
      stroke(255);
      fill(180);
      ellipse(offset+row2offset+30, height-30, 15, 15);
      fill(255);
      stroke(0);
      text('Electron Trap', offset+row2offset+60, height-26);
  }

  if (displayHoleTrap==1) {
      stroke(holeColor);
      fill(255,50);
      ellipse(offset+row2offset+160, height-30, 55, 55);
      stroke(255);
      fill(180);
      ellipse(offset+row2offset+160, height-30, 15, 15);
      fill(255);
      stroke(0);
      text('Hole Trap', offset+row2offset+190, height-26);
  }

  let row3offset = 180;
    if (displayAbsorber==1) {
      stroke(absorberColor);
      fill(absorberColor);
      rect(offset+row3offset, height-45, 10, 10);
      fill(255);
      stroke(0);
      text('Absorber', offset+row3offset+20, height-36);
  }
  
      if (displayElectronMembrane==1) {
      stroke(electronMembraneColor);
      fill(electronMembraneColor);
      rect(offset+row3offset, height-30, 10, 10);
      fill(255);
      stroke(0);
      text('Electron Membrane', offset+row3offset+20, height-21);
  }
  
      if (displayHoleMembrane==1) {
      stroke(holeMembraneColor);
      fill(holeMembraneColor);
      rect(offset+row3offset, height-15, 10, 10);
      fill(255);
      stroke(0);
      text('Hole Membrane', offset+row3offset+20, height-6);
  }
  
    let row4offset = 320;
      if (displayMetal==1) {
      stroke(metalColor);
      fill(metalColor);
      rect(offset+row4offset, height-15, 10, 10);
      fill(255);
      stroke(0);
      text('Metal Contact', offset+row4offset+20, height-6);
      fill(211, 211, 211);
      stroke(211, 211, 211);
      push();
      translate(offset+row4offset+6,height-46);
      beginShape();
          vertex(-2.5, 2.5);
          vertex(0, 12.5);
          vertex(2.5, 2.55);
          vertex(12.5, 0);
          vertex(2.5, -2);
          vertex(0, -12.5);
          vertex(-2.5, -2);
          vertex(-12.5, 0);
      endShape();
      pop();
      fill(255);
      stroke(0);
      text('Load', offset+row4offset+25, height-42);
  }

  if (displayAntiReflectionCoating==1) {
      stroke(ARCColor);
      fill(ARCColor);
      rect(offset+row4offset, height-30, 10, 10);
      fill(255);
      stroke(0);
      text('Anti Reflection Coating', offset+row4offset+20, height-21);
  }
}