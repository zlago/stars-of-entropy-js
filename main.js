const TAU = Math.PI * 2, fps = 30;

// get canvas and its context
const canvas = document.getElementById("game-screen"),
ctx = canvas.getContext("2d");

// init
const actor = [], bullet = [];
let blur = 0, showHitboxes = false,
player = actor.push(new shipPlayer()) - 1;

// get touch, show buttons
let supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;
document.getElementById("ctrl").style.display = supportsTouch? 'grid': 'none';

// hide fullscreen button and lock orientation
addEventListener("fullscreenchange", e => {
	// hide/show fullscreen button
	document.getElementById("fullscreen").style.display = document.fullscreenElement? 'none': 'block';
	// lock/unlock orientation
	document.fullscreenElement?
	screen.orientation.lock("landscape").catch(e => // lock
	{if (e.code != e.NOT_SUPPORTED_ERR) {throw e;};}): // (silence)
	screen.orientation.unlock(); // or unlock
}, true);

// misc functions
function debug() { // test function, with an ever-changing purpose
	if (player + 1) {
		spawn(rand(2)? octahedronShip: tridipyraShip);
	} else {
		//actor.length = 0; bullet.length = 0;
		player = actor.push(new shipPlayer()) - 1;
	}
}

function tick() {
	if (blur-- <= 0) {
		clear();
	}
	processGroup(actor);
	processGroup(bullet);
	drawHud();
}

function processGroup(group) {
	for (const i in group) {
		group[i].update(i);
		if (group[i] && showHitboxes) {
			const x = group[i].x, y = group[i].y, h = group[i].hitbox;
			ctx.strokeStyle = "#f00";
			ctx.strokeRect(x - h, y - h, h * 2, h * 2);
		}
		group[i]? group[i].draw? group[i].draw(): 0: 0;
	}
}

function drawHud() {
	if (player + 1) {
		const max = actor[player].constructor.hp - 1, min = Math.min(actor[player].hp - 1, max);
		ctx.clearRect(8.5, 8.5, max, 7);
		ctx.strokeStyle = "#888";
		ctx.strokeRect(8.5, 8.5, max, 7);
		if (min > 0) {
			ctx.strokeStyle = "#fff";
			ctx.strokeRect(8.5, 8.5, min, 7);
		}
	}
}

function overwrite(target, a) {
	for (const i in a) {
		a[i] = a[i].replaceAll(" ", "");
		let t = a[i].split("=");
		target[t[0]] = t[1];
	}
}

mod = (x, y) => (x % y + (x < 0? y: 0)) % y; // last `% y` fixes an edgecase for `x = -y``
rand = i => Math.floor(Math.random() * i); // eg. rand(2) = 0 || 1
clamp = (v, x, y) => Math.min(Math.max(v, x), y); // x <= v <= y
clear = e => ctx.clearRect(0, 0, canvas.width, canvas.height);
collide = (a, v, d) => // define d to also try to hurt the enemy
	a.x + a.hitbox > v.x - v.hitbox &&
	a.x - a.hitbox < v.x + v.hitbox &&
	a.y + a.hitbox > v.y - v.hitbox &&
	a.y - a.hitbox < v.y + v.hitbox &&
	(d? v.hurt?.(d): true);
