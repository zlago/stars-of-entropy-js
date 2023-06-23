// todo: research and debug touch controls

const TAU = Math.PI * 2, fps = 30;

// get canvas and its context
const canvas = document.getElementById("game-screen"),
ctx = canvas.getContext("2d");

// init
const actor = [], bullet = [];
let afterImage = 0, showHitboxes = false, player;
addEventListener("load", () => {
	player = actor.add(new shipPlayer());
	setInterval(tick, 1000 / fps);
})

actor.add = bullet.add = function (entity) {
	let x = this.findIndex(e => e == undefined);
	if (x == -1) {x = this.length}
	this[x] = entity;
	this[x].index = x;
	return x;
}

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
		player = actor.add(new shipPlayer());
	}
}

function tick() {
	if (afterImage-- <= 0) {
		clear();
	}
	processGroup(actor);
	processGroup(bullet);
	drawHud();
}

function processGroup(group) {
	for (const i in group) {
		group[i]?.update?.(); // as it turns out, adding a method to an array isnt the best idea
		if (group[i] && showHitboxes) {
			const x = group[i].x, y = group[i].y,
			hX = group[i].hitboxX ?? group[i].hitbox,
			hY = group[i].hitboxY ?? group[i].hitbox;
			ctx.strokeStyle = "#f00";
			ctx.strokeRect(x - hX, y - hY, hX * 2, hY * 2);
		}
		group[i]? group[i].draw? group[i].draw(): 0: 0;
	}
}

function drawHud() {
	if (player + 1) {
		const max = actor[player].constructor.hp - 1, min = Math.min(actor[player].hp - 1, max);
		//ctx.clearRect(8.5, 8.5, max, 7);
		ctx.strokeStyle = "#888";
		ctx.strokeRect(8.5, 8.5, max, 7);
		if (min >= 0) {
			ctx.strokeStyle = "#fff";
			ctx.strokeRect(8.5, 8.5, min, 7);
		}
	}
}

function overwrite(target, a) {
	for (const i in a) {
		a[i] = a[i].replaceAll(" ", "");
		const t = a[i].split("=");
		target[t[0]] = t[1];
	}
}

mod = (x, y) => (x % y + (x < 0? y: 0)) % y; // last `% y` fixes an edgecase for `x = -y`
rand = i => Math.floor(Math.random() * i); // eg. rand(2) = 0 || 1
clamp = (v, min, max) => Math.min(Math.max(v, min), max); // min <= v <= max
clear = e => ctx.clearRect(0, 0, canvas.width, canvas.height);
collide = (a, v, d) => // define d to also try to hurt the enemy
	a.x + (a.hitboxX ?? a.hitbox) > v.x - (v.hitboxX ?? v.hitbox) &&
	a.x - (a.hitboxX ?? a.hitbox) < v.x + (v.hitboxX ?? v.hitbox) &&
	a.y + (a.hitboxY ?? a.hitbox) > v.y - (v.hitboxY ?? v.hitbox) &&
	a.y - (a.hitboxY ?? a.hitbox) < v.y + (v.hitboxY ?? v.hitbox) &&
	(d? v.hurt?.(d): true);

function lineLine(l1, l2) {
	// this function is based on
	// http://www.jeffreythompson.org/collision-detection/line-line.php
	// and therefore is licensed under
	// https://creativecommons.org/licenses/by-nc-sa/4.0/
	// optimized by removing all copy-paste, and with variables renamed
	const a1 = (l2.x2 - l2.x1), a2 = (l2.y2 - l2.y1);
	const b1 = (l1.x2 - l1.x1), b2 = (l1.y2 - l1.y1);
	const c1 = (l1.y1 - l2.y1), c2 = (l1.x1 - l2.x1);
	const c = (a2 * b1 - a1 * b2);
	const a = (a1 * c1 - a2 * c2) / c;
	if (a < 0 || a > 1) {return false;}
	const b = (b1 * c1 - b2 * c2) / c;
	return (b >= 0 && b <= 1);
}

function lineRect(l, r, d) { // sort of..
	if (!(
		Math.max(l.x1, l.x2) > r.x - (r.hitboxX ?? r.hitbox) &&
		Math.min(l.x1, l.x2) < r.x + (r.hitboxX ?? r.hitbox) &&
		Math.max(l.y1, l.y2) > r.y - (r.hitboxY ?? r.hitbox) &&
		Math.min(l.y1, l.y2) < r.y + (r.hitboxY ?? r.hitbox)
	)) {return false;} // *probably* helps?
	const hx = r.hitboxX ?? r.hitbox, hy = r.hitboxY ?? r.hitbox;
	const x1 = r.x - hx, x2 = r.x + hx, y1 = r.y - hy, y2 = r.y + hy;
	return (
		lineLine(l, {x1: x1, x2: x2, y1: y1, y2: y2}) ||
		lineLine(l, {x1: x1, x2: x2, y1: y2, y2: y1})) &&
		(d? r.hurt?.(d): true);
}

const b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
