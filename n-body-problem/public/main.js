let bodies = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 5; i++) {
    bodies.push(new Body(
      createVector(random(width), random(height)),
      createVector(random(-1, 1), random(-1, 1)),
      random(5, 20)
    ));
  }
}

function draw() {
  background(0, 20); // semi-transparent for trails
  for (let i = 0; i < bodies.length; i++) {
    for (let j = 0; j < bodies.length; j++) {
      if (i !== j) {
        let force = bodies[j].attract(bodies[i]);
        bodies[i].applyForce(force);
      }
    }
  }

  for (let body of bodies) {
    body.update();
    body.display();
  }
}

class Body {
  constructor(pos, vel, mass) {
    this.pos = pos.copy();
    this.vel = vel.copy();
    this.acc = createVector(0, 0);
    this.mass = mass;
    this.radius = mass * 2;
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acc.add(f);
  }

  attract(other) {
    let G = 1;
    let force = p5.Vector.sub(this.pos, other.pos);
    let distance = constrain(force.mag(), 5, 25);
    force.normalize();
    let strength = (G * this.mass * other.mass) / (distance * distance);
    force.mult(strength);
    return force;
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  display() {
    noStroke();
    fill(0, 200, 255, 180);
    ellipse(this.pos.x, this.pos.y, this.radius);
  }
}

