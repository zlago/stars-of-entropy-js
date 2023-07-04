// todo: research and debug touch controls
// todo: weapon carrier ship
// todo: title screen, settings menu
// todo: player inventory, lives, game over
// todo: dialogue? idk
// todo: actual gameplay
// todo: explosions

"use strict";

const TAU = Math.PI * 2, fps = 30;

// get canvas and its context
const canvas = document.getElementById("game-screen"),
ctx = canvas.getContext("2d");

// init
const actor = [], bullet = [], gun = {}, ship = {}, shot = {},
ticker = {
	isRunning : false,
	run : function() {
		this.pause(); this.isRunning = true;
		this.interval = setInterval(tick, 1000 / fps);
		},
	pause : function() {
		this.isRunning = false;
		clearInterval(this.interval);
	}
}
let afterImage = 0, showHitboxes = false, showHP = false, player, boss;
addEventListener("load", () => {
	player = actor.add(new ship.player());
	ticker.run();
})

actor.add = bullet.add = function (entity) {
	// this is better than letting empty slots "accumulate", right?
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

function tick() {
	if (afterImage-- <= 0) {
		clear();
	}
	processGroup(actor);
	processGroup(bullet);
	hud.draw();
}

function processGroup(group) {
	for (const i in group) {
		const one = group[i];
		one?.update?.(); // as it turns out, adding a method to an array isnt the best idea
		if (one && showHitboxes) {
			const x = one.x, y = one.y,
			hX = one.hitboxX ?? one.hitbox,
			hY = one.hitboxY ?? one.hitbox;
			ctx.strokeStyle = "#f00";
			ctx.strokeRect(x - hX, y - hY, hX * 2, hY * 2);
		}
		group[i] && one?.draw?.();
		if (one?.hpMax && showHP) {
			const x = one.x, y = one.y,
			sX = one.sizeX ?? one.size,
			sY = one.sizeY ?? one.size,
			hp = one?.hp / one?.hpMax;
			ctx.strokeStyle = "#888";
			ctx.strokeRect(x - sX, y + sY + 3, sX * 2, 3);
			ctx.strokeStyle = "#fff";
			ctx.strokeRect(x - sX, y + sY + 3, hp * sX * 2, 3);
		}
	}
}

const hud = {
	draw : function() {
		if (player != hud.player || boss != hud.boss ||
		actor[boss]?.hp != hud.bosshp ||
		actor[player]?.hp != hud.playerhp) {
			hud.player = player; hud.boss = boss;
			hud.bosshp = actor[boss]?.hp;
			hud.playerhp = actor[player]?.hp;
			hud.update();
		}
		ctx.drawImage(hud.ctx.canvas, 0, 0)
	},
	update : function() {
		hud.ctx.clearRect(0, 0, 256, 24)
		if (player + 1) {
			const max = actor[player].hpMax - 1, min = Math.min(actor[player].hp - 1, max);
			hud.ctx.strokeStyle = "#888";
			hud.ctx.strokeRect(8.5, 8.5, max, 7);
			if (min >= 0) {
				hud.ctx.strokeStyle = "#fff";
				hud.ctx.strokeRect(8.5, 8.5, min, 7);
			}
		}
		if (boss + 1) {
			const aboss = actor[boss]
			if (aboss && aboss.constructor != ship.powerup) {
				const max = Math.min(aboss?.hpMax - 1, 200 - 1),
				min = aboss?.hp - 1, fine = min % 200,
				coarse = Math.floor(min / 200);
				hud.ctx.strokeStyle = this.colors[coarse];
				hud.ctx.strokeRect(48.5, 8.5, max, 7);
				for (let i = 0; i < coarse + 1; i++) {
					hud.ctx.strokeStyle = this.colors[i + 1];
					hud.ctx.strokeRect(48.5 + i * 6, 18.5, 3, 3);
				}
				if (fine > 0) {
					hud.ctx.strokeStyle = this.colors[coarse + 1];
					hud.ctx.strokeRect(48.5, 8.5, fine, 7);
				}
			} else {
				boss = undefined;
			}
		}
	},
	ctx : new OffscreenCanvas(256, 24).getContext("2d"),
	colors : ["#888", "#fff", "#f0f", "#0ff", "#f00", "#ff0", "#0f0", "#00f", "#f80"]
}


function overwrite(target, a) {
	for (const i in a) {
		const t = a[i].split("=");
		t[0] = t[0].trim(); t[1] = t[1].trim();
		if ((t[1] - 0) + "" != "NaN") {t[1] -= 0} // NaN != NaN
		target[t[0]] = t[1];
	}
}

const rand = i => Math.floor(Math.random() * i), // eg. rand(2) = 0 || 1
mod = (x, y) => (x % y + (x < 0? y: 0)) % y, // last `% y` fixes an edgecase for `x = -y`
randRange = (x, y = -x) => Math.random() * (x - y) + y, // x <= randRange(x, y) < y
clamp = (v, min, max) => Math.min(Math.max(v, min), max), // min <= v <= max
clear = e => ctx.clearRect(0, 0, canvas.width, canvas.height),
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

const b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
