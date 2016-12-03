// Create a new paiting
function Painting(dna_, x_, y_) {
  this.rolloverOn = false; // Are we rolling over this face?
  this.dna = dna_; // Face's DNA
  this.x = x_; // Position on screen
  this.y = y_;
  this.rectW = rectWidth;
  this.rectH = rectHeight;

  this.fitness = 1; // How good is this face?
  // Using java.awt.Rectangle (see: http://java.sun.com/j2se/1.4.2/docs/api/java/awt/Rectangle.html)
  //this.r = new Rectangle(this.x-this.wh/2, this.y-this.wh/2, this.wh, this.wh);
  this.r = new Rectangle(this.x - this.rectW / 2, this.y - this.rectH / 2, this.rectW, this.rectH);

  // Display the face
  this.display = function() {
    // We are using the face's DNA to pick properties for this face
    // such as: head size, color, eye position, etc.
    // Now, since every gene is a floating point between 0 and 1, we map the values
    var genes = this.dna.genes;
    var r = map(genes[0], 0, 1, 0, 70);
    var c = color(genes[1], genes[2], genes[3]);
    var eye_y = map(genes[4], 0, 1, 0, 5);
    var eye_x = map(genes[5], 0, 1, 0, 10);
    var eye_size = map(genes[5], 0, 1, 0, 10);
    var eyecolor = color(genes[4], genes[5], genes[6]);
    var mouthColor = color(genes[7], genes[8], genes[9]);
    var mouth_y = map(genes[5], 0, 1, 0, 25);
    var mouth_x = map(genes[5], 0, 1, -25, 25);
    var mouthw = map(genes[5], 0, 1, 0, 50);
    var mouthh = map(genes[5], 0, 1, 0, 10);


    //Testing out how to make the variables relative to the rectWidth - works with a steadily increasing rectWidth

    var genes = this.dna.genes;
    /*    var r            = map(genes[0],0,1,0,70*(map(rectWidth, rectWidthStart, rectWidthStart*1.5*1.5*1.5,1,3.375)));
        var c            = color(genes[1],genes[2],genes[3]);
        var eye_y        = map(genes[4],0,1,0,5*(map(rectWidth, rectWidthStart, rectWidthStart*1.5*1.5*1.5,1,3.375)));
        var eye_x        = map(genes[5],0,1,0,10*(map(rectWidth, rectWidthStart, rectWidthStart*1.5*1.5*1.5,1,3.375)));
        var eye_size     = map(genes[5],0,1,0,10*(map(rectWidth, rectWidthStart, rectWidthStart*1.5*1.5*1.5,1,3.375)));
        var eyecolor     = color(genes[4],genes[5],genes[6]);
        var mouthColor   = color(genes[7],genes[8],genes[9]);
        var mouth_y      = map(genes[5],0,1,0,25*(map(rectWidth, rectWidthStart, rectWidthStart*1.5*1.5*1.5,1,3.375)));
        var mouth_x      = map(genes[5],0,1,-25*(map(rectWidth, rectWidthStart, rectWidthStart*1.5*1.5*1.5,1,10)),25*(map(rectWidth, rectWidthStart, rectWidthStart*1.3*1.5*2,1,3.375)));
        var mouthw       = map(genes[5],0,1,0,50*(map(rectWidth, rectWidthStart, rectWidthStart*1.5*1.5*1.5,1,3.375)));
        var mouthh       = map(genes[5],0,1,0,10*(map(rectWidth, rectWidthStart, rectWidthStart*1.5*1.5*1.5,1,3.375)));*/




    // Once we calculate all the above properties, we use those variables to draw rects, ellipses, etc.
    push();
    translate(this.x, this.y);

    //NOISE
    push();
    translate(-rectWidth / 2, -rectHeight / 2);
    colorMode(HSB, 1);
    stroke(0, 0.5, 0.5, 1.0); //genes 0-3
    noFill(255);

    beginShape();
    var xoff = 0; // Option #1: 2D Noise
    for (var x = 0; x <= rectWidth; x += 1) { //genes4
      // Calculate a y value according to noise, map to 

      // Option #1: 2D Noise
      var y = map(noise(xoff, yoff), 0, 1, 0, rectHeight); //genes5-6
      // Set the vertex
      vertex(x, y);
      xoff += 0.05; //genes7
    }
    // increment y dimension for noise
    yoff += 0.01; //genes 8
    endShape();
    pop();





    // Draw the bounding box
    stroke(0.25);
    noFill();
    if (this.rolloverOn && selectedStroke) {
      strokeWeight(5);
      //fill(0, 0.25);
    } else {
      strokeWeight(1);
    }
    rectMode(CENTER);
    rect(0, 0, this.rectW, this.rectH);


    pop();

    // Display fitness value
    textAlign(CENTER);
    if (this.rolloverOn) fill(0);
    else fill(0.25);
    text('' + floor(this.fitness), this.x, this.y + 55);
  }

  this.getFitness = function() {
    return this.fitness;
  }

  this.getDNA = function() {
    return this.dna;
  }

  // Increment fitness if mouse is rolling over face
  this.rollover = function(mx, my) {
    if (this.r.contains(mx, my)) {
      this.rolloverOn = true;
      this.fitness += 0.25;
    } else {
      this.rolloverOn = false;
    }
  }
}