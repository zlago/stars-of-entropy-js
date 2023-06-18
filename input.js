const buttons = [...Array(255).fill(0)];
//const upKey = 38;
//const downKey = 40;
const leftKey = 37;
const rightKey = 39;
const aKey = 65;
const sKey = 83;

addEventListener("keydown", (event) => {
	buttons[event.keyCode] = 1;
	switch (event.keyCode) {
		case 32: // space
			//player.x = canvas.width / 2;
			//player.y = canvas.height / 2;
			enemy.push(new spawn(rand(canvas.width), rand(canvas.height), octahedronShip));
			break;
		//default:
		//console.log(event.keyCode)
	}//*/
}, true);

document.getElementById("ctrl_spawn").addEventListener("touchstart", () => {
	enemy.push(new spawn(rand(canvas.width), rand(canvas.height), octahedronShip));
})

addEventListener("keyup", (event) => {
	buttons[event.keyCode] = 0;
}, true);

function bindButton(id, input) {
	let element = document.getElementById(id);
	element.addEventListener("touchstart", () => {buttons[input] = 1;})
	element.addEventListener("touchend", () => {buttons[input] = 0;})
}

bindButton("ctrl_l", leftKey);
bindButton("ctrl_r", rightKey);
bindButton("ctrl_a", aKey);
bindButton("ctrl_s", sKey);
