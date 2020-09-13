var canvas = document.getElementById('space-box');
var c = canvas.getContext('2d');

var innerWidth = window.innerWidth - 100, //dependent on border size`(100 is used because 50px border each side)
  innerHeight = window.innerHeight - 100,
	radius = window.innerWidth/200,
	starsIndex = 0,
	stars = [],
	TWO_PI = Math.PI*2,
	centerX = innerWidth/2,
	centerY = innerHeight/2,
	focalLength = 400,
	starRadius = null,
	starX = null,
	starY = null,
	numStars = 600,
	mouse = {},
	starX_dir = 0,
	starY_dir = 0;
  FPS = 60;

  move_speed = -0.16;

	canvas.width = innerWidth;
	canvas.height = innerHeight;

window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas() {
  innerWidth = document.body.clientWidth; //dependent on border size`(100 is used because 50px border each side)
  innerHeight = document.body.clientHeight;

  console.log(innerWidth, innerHeight);

  centerX = innerWidth/2;
  centerY = innerHeight/2;


	canvas.width = innerWidth;
  canvas.height = innerHeight;

    }

// Function for creating new star
function star(x,y,z){
  this.x = x;
	this.y = y;
	this.z = z;
	this.radius = radius;
	this.color = "#5B0A91";
	starsIndex++;
	stars[starsIndex] = this;
	this.id = starsIndex;

	// Animate Stars
	this.update = function(){
	  starX = (this.x - centerX) * (focalLength / this.z);
	  starX += centerX;

	  starY = (this.y - centerY) * (focalLength / this.z);
	  starY += centerY;

	  starRadius = radius * (focalLength / this.z);

	  starX += starX_dir;
	  starY += starY_dir;

	  this.z += move_speed;

	  if(this.z <= 0){
	     this.z = parseInt(innerWidth);
	  }

	  this.draw();

	}

	// Function for drawing star
	this.draw = function(){
    c.fillStyle = this.color;
		c.beginPath();
    c.fillRect(starX, starY, starRadius, starRadius)
		c.closePath();
	}

}

// X,Y,Z values
var s;
for(s = 0; s < numStars; s++){
	x = Math.random() * innerWidth;
	y = Math.random() * innerHeight;
	z = Math.random() * innerWidth;
	new star(x,y,z);
}

// Function for animating canvas objects
function animate(){
    requestAnimationFrame(animate);
	c.fillStyle = "#100016";
	c.fillRect(0,0,innerWidth,innerHeight);

	for(var i in stars){
	  stars[i].update();
	}
}

animate();
