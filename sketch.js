let osc, delay, absolute, alpha, beta, gamma, slider;
let phone = false;
let playing = false;

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
  phone = true;
}

window.addEventListener("deviceorientation", handleOrientation, true);

function handleOrientation(event) {
  absolute = event.absolute;
  alpha = event.alpha;
  beta = event.beta;
  gamma = event.gamma;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  textAlign(CENTER);

  slider = createSlider(0, 360, 0, 0);
  slider.position(width / 20, height / 20);
  slider.style("width", "80px");

  osc = new p5.Oscillator();
  osc.setType("sine");

  delay = new p5.Delay();
  // // source, delayTime, feedback, filter frequency
}

function draw() {
  textSize(20);
  stroke(random(255));
  strokeWeight(10);
  fill(255);

  var val = slider.value();
  var mappedVal = map(val, 0, 360, 0, 0.999);
  delay.process(osc, mappedVal, 0.7, 2300);
  delay.drywet([mappedVal]);
  delay.feedback(mappedVal);
  text("ECHO", width / 10 + 10, height / 10 + 10);

  textSize(50);

  if (playing == false) {
    //text("CLICK TO PLAY", width / 2, height / 2);
    triangle(
      width * 0.45,
      height * 0.45,
      width * 0.55,
      height / 2,
      width * 0.45,
      height * 0.55
    );
  }
  if (phone == true && playing == false) {
    background(0);
    strokeWeight(2);
    textSize(20);
    text("ECHO", width / 5, height / 10 + 40);
    textSize(50);
    triangle(
      width * 0.45,
      height * 0.45,
      width * 0.55,
      height / 2,
      width * 0.45,
      height * 0.55
    );
    //text("TAP TO PLAY", width / 2, height / 2);
  }
  stroke(random(255), random(255), random(255));
  if (phone == false && playing == false) {
    //ellipse(mouseX, mouseY, 100);
    let speed = abs(mouseX - pmouseX) + abs(mouseY - pmouseY);
    ellipse(mouseX, mouseY, speed, speed);
  } else if (playing == true) {
    fill(random(220, 255));
    if (phone == false) {
      background(0);
      ellipse(width / 2, height / 2, map(mouseX, 0, width, 0, height));
    } else if (phone == true) {
      background(0);
      ellipse(width / 2, height / 2, map(gamma, -90, 90, 0, 300));
    }
  }

  if (phone == false) {
    osc.freq(mouseX);
    osc.amp(map(-mouseY, -windowHeight, 0, 0, 1));
  } else if (phone == true) {
    var freq = map(gamma, -90, 90, 100, 2000) || 0;
    var amp = map(beta, -180, 180, 0, 1) || 0;
    osc.freq(freq);
    osc.amp(amp);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}

function touchEnded() {
  // background(0);
  if (mouseX > width / 3.5 || mouseY > height / 3.5) {
    if (playing == false) {
      osc.start();
      playing = true;
    } else if (playing == true) {
      osc.stop();
      playing = false;
    }
  }
}
