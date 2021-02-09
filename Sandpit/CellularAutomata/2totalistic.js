let distances = [];
let resetdistances = [];
let maxDistance;
let spacer;
let rule;
let ruleN = 600;

function setup() {
  var canvas = createCanvas(700, 360);
  canvas.parent('canvasForHTML');
  spacer = 10;
  newset();
  distances[int(width/spacer/2)-1][0] = 1;
  fill(20,20,20);
  rect(-2, -2, width+4, height+4);


  let button = select('#start');
  button.mousePressed(reset);


  let r777 = select('#rule777');
  r777.mousePressed(changeRule777);
  let r912 = select('#rule912');
  r912.mousePressed(changeRule912);
  let r993 = select('#rule993');
  r993.mousePressed(changeRule993);
  let r1074 = select('#rule1074');
  r1074.mousePressed(changeRule1074);
  let r1083 = select('#rule1083');
  r1083.mousePressed(changeRule1083);  
  let r600 = select('#rule600');
  r600.mousePressed(changeRule600);
}

function draw() {
  if(frameCount % 5 === 0){
    fill(20,20,20);
    rect(-2, -2, width+4, height+4);
    stroke(0,0,0);
    fill(0,150,0);
    rule = calculateRule(ruleN)
    display();
    moveDown();
    applyRule();
  }
}

function newset() {
    for (let x = 0; x <= (width/spacer); x += 1) {
    distances[x] = []; // create nested array
    resetdistances[x] = [];
    for (let y = 0; y < (height/spacer); y += 1) {
      distances[x][y] = 0;
      resetdistances[x][y] = 0;
    }
  }
}

function reset() {
    for (let x = 0; x <= (width/spacer); x += 1) {
    for (let y = 0; y < (height/spacer); y += 1) {
      distances[x][y] = 0;
      distances[int(width/spacer/2)-1][0] = 1;
    }
  }
}

function changeRule777() {ruleN = 777}
function changeRule912() {ruleN = 912}
function changeRule993() {ruleN = 993}
function changeRule600() {ruleN = 600}
function changeRule1074() {ruleN = 1074}
function changeRule1083() {ruleN = 1083}

function calculateRule(ruleNumber) {
    if (ruleNumber == 1) {rule='0000001'} else {
    rule=ruleNumberToRules(ruleNumber)
    while (rule.length<7) {
      rule = '0' + rule;
    }
  }
  if (ruleNumber == 0) {rule='0000000'}
  rule = [int(rule[0]),int(rule[1]),int(rule[2]),int(rule[3]),int(rule[4]),int(rule[5]),int(rule[6])]
  return rule
}

function ruleNumberToRules(val, res = '') {
  if (val >= 3) {
    res = val % 3  + res
    return ruleNumberToRules(val = int(val / 3), res);
  }
  if (val == 2){
    res = '2' + res;
    return res;
  }
  if (val == 1){
    res = '1' + res;
    return res;
  }
}

function display() {
  for (let x = 0; x < (width/spacer); x += 1) {
      for (let y = 0; y < (height/spacer); y += 1) {
        if (distances[x][y] ==1) {
          fill(0,75,0);
          square(x*spacer, y*spacer,8,2);
        }
        if (distances[x][y] ==2) {
          fill(0,150,0);
          square(x*spacer, y*spacer,8,2);
        }
        console.log(ruleN)
      }
    }
}

function moveDown() {
    for (let y = (height/spacer); y >= 0; y--) {
    for (let x = 0; x < (width/spacer); x++) {
      distances[x][y+1] = distances[x][y]
    }
  }
}

function applyRule() {
    for (let x = 1; x < (width/spacer)-1; x++) {
        if((distances[x-1][1]+distances[x][1]+distances[x+1][1])==6) {distances[x][0] = rule[0]}
        if((distances[x-1][1]+distances[x][1]+distances[x+1][1])==5) {distances[x][0] = rule[1]}
        if((distances[x-1][1]+distances[x][1]+distances[x+1][1])==4) {distances[x][0] = rule[2]}
        if((distances[x-1][1]+distances[x][1]+distances[x+1][1])==3) {distances[x][0] = rule[3]}
        if((distances[x-1][1]+distances[x][1]+distances[x+1][1])==2) {distances[x][0] = rule[4]}
        if((distances[x-1][1]+distances[x][1]+distances[x+1][1])==1) {distances[x][0] = rule[5]}
        if((distances[x-1][1]+distances[x][1]+distances[x+1][1])==0) {distances[x][0] = rule[6]}
    }
    // x = 0  
        if((distances[width/spacer][1]+distances[0][1]+distances[1][1])==6) {distances[0][0] = rule[0]}
        if((distances[width/spacer][1]+distances[0][1]+distances[1][1])==5) {distances[0][0] = rule[1]}
        if((distances[width/spacer][1]+distances[0][1]+distances[1][1])==4) {distances[0][0] = rule[2]}
        if((distances[width/spacer][1]+distances[0][1]+distances[1][1])==3) {distances[0][0] = rule[3]}
        if((distances[width/spacer][1]+distances[0][1]+distances[1][1])==2) {distances[0][0] = rule[4]}
        if((distances[width/spacer][1]+distances[0][1]+distances[1][1])==1) {distances[0][0] = rule[5]}
        if((distances[width/spacer][1]+distances[0][1]+distances[1][1])==0) {distances[0][0] = rule[6]}
    // x = width/spacer
        if((distances[width/spacer-1][1]+distances[width/spacer][1]+distances[0][1])==6) {distances[width/spacer][0] = rule[0]}
        if((distances[width/spacer-1][1]+distances[width/spacer][1]+distances[0][1])==5) {distances[width/spacer][0] = rule[1]}
        if((distances[width/spacer-1][1]+distances[width/spacer][1]+distances[0][1])==4) {distances[width/spacer][0] = rule[2]}
        if((distances[width/spacer-1][1]+distances[width/spacer][1]+distances[0][1])==3) {distances[width/spacer][0] = rule[3]}
        if((distances[width/spacer-1][1]+distances[width/spacer][1]+distances[0][1])==2) {distances[width/spacer][0] = rule[4]}
        if((distances[width/spacer-1][1]+distances[width/spacer][1]+distances[0][1])==1) {distances[width/spacer][0] = rule[5]}
        if((distances[width/spacer-1][1]+distances[width/spacer][1]+distances[0][1])==0) {distances[width/spacer][0] = rule[6]}
}
