/*To do

- [ ] Make a version where all the drawings are pre-made (only do x iterations which are then displayed without any animation)
- [ ] Make a version where all the drawings animate, but the background slowly erases them (so they don’t overpaint everything)
- [ ] Fix the numbers and counting system
- [ ] Put it online without the Eye Tracking

*/

// Create a new painting
function Painting(dna_, x_, y_) {
  this.rolloverOn = false; // Are we rolling over this painting?
  this.dna = dna_; // Painting's DNA
  this.x = x_; // Position on screen
  this.y = y_;
  this.rectW = rectWidth;
  this.rectH = rectHeight;

  this.fitness = 1; // How good is this painting?
  // Using java.awt.Rectangle (see: http://java.sun.com/j2se/1.4.2/docs/api/java/awt/Rectangle.html)
  //this.r = new Rectangle(this.x-this.wh/2, this.y-this.wh/2, this.wh, this.wh);
  this.r = new Rectangle(this.x - this.rectW / 2, this.y - this.rectH / 2, this.rectW, this.rectH);

  // Display the painting
  this.display = function() {
    // We are using the painting's DNA to pick properties for this painting
    // such as: color variables, noise increments etc
    // Now, since every gene is a floating point between 0 and 1, we map the values
    var genes = this.dna.genes;

    //Testing out how to make the variables relative to the rectWidth - works with a steadily increasing rectWidth
    var genes = this.dna.genes;
    //var r            = map(genes[0],0,1,0,70*(map(rectWidth, rectWidthStart, rectWidthStart*1.5*1.5*1.5,1,3.375)));
    var h = genes[0];
    var s = map(genes[1], 0,1,0.0,0.5);
    var b = map(genes[2], 0,1,0.5,1);
    var a = map(genes[4],0,1,0.03,0.2);
    var xInc =  floor(rectWidth/(map(genes[5],0, 1,20,250)));
    var xoffInc = map(genes[6], 0, 1, 0.008, 0.012);
    var yoffInc = map(genes[7], 0, 1, 0.001, 0.005)*(rectHeight/height) ;
    var xoffOffset = genes[8]*100;
    
    //var yMax = map(genes[7], 0, 1, 3*rectHeight/4, rectHeight);

    // Once we calculate all the above properties, we use those variables to draw rects, ellipses, etc.
    push();
    translate(this.x, this.y);

    //NOISE
    push();
    translate(-rectWidth / 2, -rectHeight / 2);
  
  colorMode(HSB, 1);
  stroke(h,s,b, a); //genes 0-3
  noFill();
 
  beginShape(); 
  var xoff = 0 + this.x + this.y;   //Sloppy way to make them not totally alike in terms of noise period
  for (var x = 0; x <= rectWidth; x += xInc) { //genes4
    // Calculate a y value according to noise, map to 
    
    // Option #1: 2D Noise
    var y = map(noise(xoff, yoff), 0, 1, 0,rectHeight); //genes5-6
    // Set the vertex
    vertex(x, y); 
    xoff += xoffInc; //genes7
  }
  // increment y dimension for noise
  yoff += yoffInc; 
 
  endShape();
  pop();




    
    // Draw the bounding box
    
    
    /*if (showInfo == true) {
    pg.colorMode(RGB,255, 255, 255)
    pg.stroke(255,255,255);
    
    pg.noFill();
    if (this.rolloverOn && selectedStroke) {
      pg.strokeWeight(5);
      //fill(0, 0.25);
    } else {
      pg.strokeWeight(1);
    }
    rectMode(CENTER);
    //pg.rect(0, 0, this.rectW, this.rectH);
    }*/
    
    
    pop();
  }
  
  
  this.displayFitness = function() {
    textAlign(CENTER);
    if (this.rolloverOn) fill(150);
    else fill(255);
    text('' + floor(this.fitness), this.x, this.y + 55);
  }
  

  this.getFitness = function() {
    return this.fitness;
  }

  this.getDNA = function() {
    return this.dna;
  }

  // Increment fitness if mouse is rolling over painting
  this.rollover = function(mx, my) {
    if (this.r.contains(mx, my)) {
      this.rolloverOn = true;
      this.fitness += 0.25;
    } else {
      this.rolloverOn = false;
    }
  }
}