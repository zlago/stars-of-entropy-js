"use strict";

const key = {
	a : 0, b : 0, d : 0, left : 0, right : 0, set input(keyCode) {
		key.binds[this.curr] = keyCode; this.curr = undefined;
	},
	curr : undefined, change : (input, value) => {
		// hard to describe, note to self: this is important
		for (const a in key.binds) {
			if (key.binds[a] == input) {key[a] = value}
		}
	}, binds : {a : 65, s : 83, d : 68, right : 39, left : 37} // up: 38, down : 40
}

document.getElementById("fullscreen").addEventListener("click",
	e => document.getElementsByTagName("html")[0].requestFullscreen()
);

addEventListener("keydown", e => {
	key.change(e.keyCode, true);
	switch (e.keyCode) {
		case 32: // space
			debug.open();
			break;
		default:
		//console.log(event.keyCode)
	}
}, true);

//window.addEventListener("keydown", e => key.input = e.keyCode, {once: true})

addEventListener("keyup", e => key.change(e.keyCode, false), true);

function bindButton(id, input) {
	let element = document.getElementById(id);
	element.addEventListener("touchstart", e => key[input] = true, {passive: false});
	element.addEventListener("touchend", e => key[input] = false, {passive: false});
}

document.getElementById("ctrl_debug").addEventListener("touchstart", debug.open, {passive: false});
bindButton("ctrl_l", "left");
bindButton("ctrl_r", "right");
bindButton("ctrl_s", "s");
bindButton("ctrl_a", "a");
document.getElementById("ctrl_ss").addEventListener("touchstart", e => buttons[sKey] = !buttons[sKey], {passive: false});
