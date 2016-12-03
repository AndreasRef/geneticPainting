
  // Create a new face
  function Face(dna_, x_, y_) {
    this.rolloverOn = false; // Are we rolling over this face?
    this.dna = dna_; // Face's DNA
    this.x = x_;     // Position on screen
    this.y = y_;
    //this.wh = rectSize;      // Size of square enclosing face
    this.rectW = rectWidth;
    this.rectH = rectHeight;
    
    this.fitness = 1; // How good is this face?
    // Using java.awt.Rectangle (see: http://java.sun.com/j2se/1.4.2/docs/api/java/awt/Rectangle.html)
    //this.r = new Rectangle(this.x-this.wh/2, this.y-this.wh/2, this.wh, this.wh);
    this.r = new Rectangle(this.x-this.rectW/2, this.y-this.rectH/2, this.rectW, this.rectH);

  // Display the face
  this.display = function() {
    // We are using the face's DNA to pick properties for this face
    // such as: head size, color, eye position, etc.
    // Now, since every gene is a floating point between 0 and 1, we map the values
    var genes = this.dna.genes;
    var r            = map(genes[0],0,1,0,70);
    var c            = color(genes[1],genes[2],genes[3]);
    var eye_y        = map(genes[4],0,1,0,5);
    var eye_x        = map(genes[5],0,1,0,10);
    var eye_size     = map(genes[5],0,1,0,10);
    var eyecolor     = color(genes[4],genes[5],genes[6]);
    var mouthColor   = color(genes[7],genes[8],genes[9]);
    var mouth_y      = map(genes[5],0,1,0,25);
    var mouth_x      = map(genes[5],0,1,-25,25);
    var mouthw       = map(genes[5],0,1,0,50);
    var mouthh       = map(genes[5],0,1,0,10);

    // Once we calculate all the above properties, we use those variables to draw rects, ellipses, etc.
    push();
    translate(this.x, this.y);
    noStroke();

    // Draw the head
    fill(c);
    ellipseMode(CENTER);
    ellipse(0, 0, r, r);

    // Draw the eyes
    fill(eyecolor);
    rectMode(CENTER);
    rect(-eye_x, -eye_y, eye_size, eye_size);
    rect( eye_x, -eye_y, eye_size, eye_size);

    // Draw the mouth
    fill(mouthColor);
    rectMode(CENTER);
    rect(mouth_x, mouth_y, mouthw, mouthh);

    // Draw the bounding box
    stroke(0.25);
    if (this.rolloverOn) fill(0, 0.25);
    else noFill();
    rectMode(CENTER);
    rect(0, 0, this.rectW, this.rectH);
    pop();

    // Display fitness value
    textAlign(CENTER);
    if (this.rolloverOn) fill(0);
    else fill(0.25);
    text('' + floor(this.fitness), this.x, this.y+55);
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

