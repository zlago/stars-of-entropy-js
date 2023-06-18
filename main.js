const fps = 30;
const playerBullets = [];
const enemy = [];
const enemyBullets = [];
const remove = [];

const canvas = document.getElementById("game-screen");
const ctx = canvas.getContext("2d");

const player = new shipPlayer(canvas.width / 2, canvas.height / 2);

function init() {
	setInterval(tick, 1000 / fps);
}

function rand(input = 2) {
	return Math.floor(Math.random() * input);
}

function collide(obj1, obj2) {
	return (
		obj1.x + obj1.size > obj2.x - obj2.size &&
		obj1.x - obj1.size < obj2.x + obj2.size &&
		obj1.y + obj1.size > obj2.y - obj2.size &&
		obj1.y - obj1.size < obj2.y + obj2.size
	);
}

function tick() {
	clear();
	player.update();
	player.draw();
	processGroup(playerBullets);
	processGroup(enemy);
	processGroup(enemyBullets);
}

function processGroup(group) {
	for (i in group) {
		group[i].update(i);
		group[i].draw();
	}
	for (let i = remove.length; i > 0; i--) {
		group.splice(remove.pop(), 1);
	}
}

function clear() {
	ctx.beginPath();
	ctx.fillStyle = "#000";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function clamp(value, min, max) {
	return Math.min(Math.max(value, min), max);
}
