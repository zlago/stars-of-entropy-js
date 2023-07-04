const icon = {
	pea: [
		"strokeStyle", "#0f0",
		"ellipse", 0, 0, 1, 1, 0, 0, TAU
	],
	shotgun: [
		"strokeStyle", "#0f0",
		"moveTo", .4,-1,
		"lineTo", 1, -.4,
		"lineTo", .2, .4,
		"lineTo",-.4,-.2,
		"lineTo", .4,-1,
		"stroke", "beginPath",
		"strokeStyle", "#ff0",
		"moveTo",-.4,1,
		"lineTo",-1, .4,
	],
	missile: [
		"moveTo", 1, 0,
		"lineTo", 1,-1,
		"lineTo", 0,-1,
		"stroke", "beginPath",
		"strokeStyle", "#0ff",
		"ellipse", -.5, .5, .5, .5, 0, 0, TAU
	],
	sniper: [
		"strokeStyle", "#ff0",
		"moveTo",-.5, 1,
		"lineTo", 1, -1,
		"lineTo",-1, .5
	],
	flamer: [
		"strokeStyle", "#f00",
		"ellipse", 0, 0, 1, 1, 0, 0, TAU * .5,
		"moveTo", -1, 0,
		"lineTo",-.5, -1,
		"lineTo",  0,-.2,
		"lineTo", .5, -1,
		"lineTo", 1, 0,
		"stroke", "beginPath",
		"strokeStyle", "#ff0",
		"ellipse", 0, .2, .3, .3, 0, 0, TAU
	],
	scatter: [
		"ellipse", .2, .7, .3, .3, 0, 0, TAU,
		"stroke", "beginPath",
		"ellipse",-.7, .0, .3, .3, 0, 0, TAU,
		"stroke", "beginPath",
		"ellipse", .7,-.7, .3, .3, 0, 0, TAU
	],
}
