const TAU = Math.PI * 2, fps = 30;

// get canvas and its context
const canvas = document.getElementById("game-screen"),
ctx = canvas.getContext("2d");

// init
const actor = [], bullet = [];
let player = actor.push(new shipPlayer()) - 1;

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
function debug() {
	if (player + 1) {
		spawn(rand(2)? octahedronShip: tridipyraShip);
	} else {
		//clearArray(actor); clearArray(bullet);
		player = actor.push(new shipPlayer()) - 1;
	}
}

function tick() {
	clear();
	processGroup(actor);
	processGroup(bullet);
	//drawHud();
}

function processGroup(group) {
	for (i in group) {
		group[i].update(i);
		group[i]? group[i].draw? group[i].draw(): 0: 0;
	}
}

function drawHud() {
	const max = player.constructor.hp - 1, min = Math.min(player.hp - 1, max);
	ctx.strokeStyle = "#888";
	ctx.strokeRect(8.5, 8.5, max, 7);
	if (min > 0) {
		ctx.strokeStyle = "#fff";
		ctx.strokeRect(8.5, 8.5, min, 7);
	}
}

mod = (x, y) => x % y + (x < 0? y: 0);
clearArray = a => a.splice(0, a.length);
rand = i => Math.floor(Math.random() * i);
clamp = (v, x, y) => Math.min(Math.max(v, x), y);
clear = e => ctx.clearRect(0, 0, canvas.width, canvas.height);
collide = (a, v, d) =>
	a.x + a.size > v.x - v.size &&
	a.x - a.size < v.x + v.size &&
	a.y + a.size > v.y - v.size &&
	a.y - a.size < v.y + v.size &&
	d? v.hurt(d): false;
