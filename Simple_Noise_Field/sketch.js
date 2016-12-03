var inc = 0.1;
var scl = 10;
var colsNoise, rowsNoise;

var zoff = 0;
var fr;
var particles = [];

var flowfield;
var fromColor = 80;
var toColor = 150;

var rectSize = 150;


function setup() {
  createCanvas(1200, 600);

  colorMode(HSB, 1);
  colsNoise = floor(width / scl);
  rowsNoise = floor(width / scl);
  fr = createP('');

  flowfield = new Array(colsNoise * rowsNoise);

  for (var i = 0; i < 50; i++) {
    particles[i] = new Particle();
  }
  background(255);
}

function draw() {

  updateNoise();
  
  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }
  fr.html(floor(frameRate()));
}



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