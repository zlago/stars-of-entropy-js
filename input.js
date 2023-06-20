const buttons = [...Array(255).fill(false)];
const leftKey = 37, rightKey = 39, sKey = 83, aKey = 65;
//const upKey = 38, downKey = 40;

document.getElementById("fullscreen").addEventListener("click",
	e => document.getElementsByTagName("html")[0].requestFullscreen()
);

addEventListener("keydown", e => {
	buttons[e.keyCode] = 1;
	switch (e.keyCode) {
		case 32: // space
			debug();
			break;
		default:
		//console.log(event.keyCode)
	}
}, true);

addEventListener("keyup", e => buttons[e.keyCode] = 0, true);

function bindButton(id, input) {
	let element = document.getElementById(id);
	element.addEventListener("touchstart", e => buttons[input] = true);
	element.addEventListener("touchend", e => buttons[input] = false);
}

document.getElementById("ctrl_spawn").addEventListener("touchstart", debug);
bindButton("ctrl_l", leftKey);
bindButton("ctrl_r", rightKey);
bindButton("ctrl_s", sKey);
bindButton("ctrl_a", aKey);
document.getElementById("ctrl_ss").addEventListener("touchstart", e => buttons[sKey] = !buttons[sKey]);
