// EYETRACKER START
var eyeX;
var eyeY;

ws = new WebSocket("ws://localhost:8887");
ws.onopen = function() {
  log("[WebSocket#onopen]\n");
}

ws.onmessage = function(e) {
  data = JSON.parse(e.data);

  if (data && data.gaze) {
    eyeX = data.gaze.x;
    eyeY = data.gaze.y;
  }
}
ws.onclose = function() {
//Do nothing
}
  // EYETRACKER END



var population;
var info;

var showEyePoint = false;
var selectedStroke = true;
var gazeControl = true;

//var rectSize = 100;

var rectWidthStart = rectWidth = 275;
var rectHeightStart = rectHeight = 150;

var spacing = 10;
var rows = 4;
var columns = 4;
var popmax = rows * columns;
var buttonText = "Click here to progess";

function setup() {
  createCanvas(displayWidth, displayHeight - 100);
  colorMode(RGB, 1.0, 1.0, 1.0, 1.0);
  var mutationRate = 0.05; // A pretty high mutation rate here, our population is rather small we need to enforce variety
  // Create a population with a target phrase, mutation rate, and population max
  population = new Population(mutationRate, popmax);
  // A simple button class
  button = createButton(buttonText);
  button.mousePressed(nextGen);
  button.position(spacing, height - 50);
  info = createDiv('');
  info.position(spacing, height - 25);
}

function draw() {
  background(1);
  // Display the faces
  population.display();
  if (gazeControl) {
  population.rollover(eyeX, eyeY);
  } else {
  population.rollover(mouseX, mouseY);  
  }

  if(showEyePoint) ellipse(eyeX, eyeY, 10, 10);

  info.html("Generation #:" + population.getGenerations());
}

// If the button is clicked, evolve next generation
function nextGen() {
  population.selection();
  population.reproduction();
}


//Debug stuff in keyPressed

function keyPressed() {
 
 if (key === '1') {
   showEyePoint =! showEyePoint;
 } 
 else if (key === '2') {
   gazeControl =! gazeControl;
 }
  else if (key === '3') {
   selectedStroke =! selectedStroke;
   
 }
  
}
