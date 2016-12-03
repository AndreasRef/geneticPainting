var yoff = 0.0;        // 2nd dimension of perlin noise

function setup() {
  createCanvas(710, 400);
}

function draw() {
  
  
  push();
  colorMode(HSB, 1);
  stroke(0, 0.5, 0.5, 0.1); //genes 0-3
  noFill(255);
 
  beginShape(); 
  var xoff = 0;       // Option #1: 2D Noise
  for (var x = 0; x <= width; x += 10) { //genes4
    // Calculate a y value according to noise, map to 
    
    // Option #1: 2D Noise
    var y = map(noise(xoff, yoff), 0, 1, 0,height); //genes5-6
    // Set the vertex
    vertex(x, y); 
    xoff += 0.05; //genes7
  }
  // increment y dimension for noise
  yoff += 0.01; //genes 8
 /* vertex(width, height);
  vertex(0, height);*/
  endShape();
  pop();
}
