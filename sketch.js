var tower = [];
var piece;
var baser;
var score = 0;
var before;
var lost = false;

function setup() {
	createCanvas(500, 800);
	baser = new base();
	before = baser;
	piece = new Piece(width/2, baser.y - 40 - 15, 300, true, 3);
	tower.push(piece);
}

function losted() {
	lost = true;
	tower = [];
	score = 0;
	setup();
}

function draw() {
	background(51);
	screenUpdate();
	for(var i = 0; i < tower.length; i++) {
		tower[i].update();
		tower[i].show();
	}
	if (lost) {
		push();
		textSize(60);
		strokeWeight(4);
		text("GAME OVER", width/6, height/2);
		pop();
	}
	baser.draw();
	textSize(40);
	fill(255);
	text(score, 35, 35);
}

function base() {
	this.x = width/2;
	this.y = height - 40;
	this.size = 300;
	this.draw = function() {
		rectMode(CENTER);
		fill(127,127,127);
		rect(this.x, this.y, this.size, 80);
	}
}

function keyPressed() {
	if (key == " " && !lost) {
		var npiece = piece.stoping(before);
		if (npiece.size < 0) {
			lost = true;
			return;
		}
		before = piece;
		tower.push(npiece);
		piece = npiece;
		score++;
	}
	if (keyCode == ENTER && lost) {
		losted();
		lost =! lost;
	}
}

function screenUpdate() {
	if (piece.y < 200) {
		for(var k = tower.length-1; k>=0; k--) {
			tower[k].y += 40;
			if(tower[k].y > height + 60) {
				tower.splice(k, 1);
			}
		}
		baser.y += 40;
	}
}