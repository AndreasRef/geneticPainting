
var population;
var info;

var rectSize = 100;

var rectWidthStart = rectWidth = 300;
var rectHeightStart = rectHeight = 175;

var spacing = 10; 
var rows = 4;
var columns = 4;
var popmax = rows*columns;
var buttonText = "Click here to progess";

function setup() {
  createCanvas(displayWidth,displayHeight-75);
  colorMode(RGB,1.0, 1.0, 1.0, 1.0);
  var mutationRate = 0.05;  // A pretty high mutation rate here, our population is rather small we need to enforce variety
  // Create a population with a target phrase, mutation rate, and population max
  population = new Population(mutationRate,popmax);
  // A simple button class
  button = createButton(buttonText);
  button.mousePressed(nextGen);
  button.position(spacing,height-50);
  info = createDiv('');
  info.position(spacing,height-25);
}

function draw() {
  background(1);
  // Display the faces
  population.display();
  population.rollover(mouseX,mouseY);
  info.html("Generation #:" + population.getGenerations());
}

// If the button is clicked, evolve next generation
function nextGen() {
  population.selection();
  population.reproduction();
}