// EYETRACKER START
var eyeX;
var eyeY;


ws = new WebSocket("ws://localhost:8887");

ws.onmessage = function(e) {
  data = JSON.parse(e.data);

  if (data && data.gaze) {
    eyeX = data.gaze.x;
    eyeY = data.gaze.y;
  }
}


//pGraphics
var pg;

//Noise Start
var yoff = 0.0; 

//Genetic start
var population;
var info;

var showEyePoint = false;
var selectedStroke = false;
var gazeControl = false;
var showInfo = false;

var rectWidthStart = rectWidth = 300;
var rectHeightStart = rectHeight = 175;

var spacing = 10;
var rows = 4;
var columns = 4;
var popmax = rows * columns;
var buttonText = "Click here to progess";

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  pixelDensity(1);
  
  pg = createGraphics(displayWidth, displayHeight);
  
  var mutationRate = 0.05; // A pretty high mutation rate here, our population is rather small we need to enforce variety
  // Create a population with a target phrase, mutation rate, and population max
  population = new Population(mutationRate, popmax);
  // A simple button class
  button = createButton(buttonText);
  button.mousePressed(nextGen);
  button.position(spacing, height - 50);
  info = createDiv('');
  info.position(spacing, height - 25);
  info.style("color","#FFFFFF");
  
  fill(255);
  stroke(255);
  frameRate(10);
  background(0);
}

function draw() {
  if (showInfo) pg.background(0);
  
  //background(1);
  // Display the faces
  population.display();
  if (gazeControl) {
    population.rollover(eyeX, eyeY);
  } else {
    population.rollover(mouseX, mouseY);
  }

  if (showEyePoint) ellipse(eyeX, eyeY, 10, 10);

  info.html("Generation #:" + population.getGenerations());
  
  if (showInfo) image(pg,0,0);
}

// If the button is clicked, evolve next generation
function nextGen() {
  background(0);
  population.selection();
  population.reproduction();
}



function keyPressed() {
  if (key === '1') {
    showEyePoint =! showEyePoint;
  } else if (key === '2') {
    gazeControl =! gazeControl;
  } else if (key === '3') {
    selectedStroke =! selectedStroke;
  } else if (key === '4') {
    showInfo =! showInfo;
    
    if (showInfo == false) {
      pg.clear;
    background(0);
      
    }
    
    console.log(showInfo);
  }

}


//NOISE
function updateNoise() {
  var yoff = 0;
  for (var y = 0; y < rowsNoise; y++) {
    var xoff = 0;
    for (var x = 0; x < colsNoise; x++) {
      var index = x + y * colsNoise;
      var angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowfield[index] = v;
      xoff += inc;
    }
    yoff += inc;

    zoff += 0.0003;
  }
}