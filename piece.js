
function Piece(x,y, size, mov, vel) {
	this.x = x;
	this.y = y;
	this.moving = mov;
	this.vel = vel;
	this.size = size;
	this.col = color(random(255),random(255),random(255));
}

//piece movement
Piece.prototype.update = function() {
	if(this.moving) {
		if(this.offScreen()) {
			this.vel *= -1;
		}
		this.x += this.vel;
	}
}

//piece display
Piece.prototype.show = function() {
	fill(this.col);
	rectMode(CENTER);
	rect(this.x,this.y, this.size, 30);
}

//keep piece inside canvas
Piece.prototype.offScreen = function() {
	if(this.x + (this.size/2) >= width || this.x - (this.size/2) <= 0) {
		return true;
	}
	return false;
}

//stopping piece and making new one
Piece.prototype.stoping = function(bef) {
	this.moving = false;
	var sz = px = 0;
	if (this.x - this.size/2 < bef.x - bef.size/2) {
		sz = (this.x + this.size/2) - (bef.x - bef.size/2)
		px = bef.x - bef.size/2 + sz/2;
	} else {
		sz = (bef.x + bef.size/2) - (this.x - this.size/2);
		px = bef.x + bef.size/2 - sz/2;
	}
	this.x = px;
	this.size = sz;
	return (new Piece(px, this.y - 30, sz, true, this.vel));
}