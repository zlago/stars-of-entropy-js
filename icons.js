const icon = {
	pea: [
		"strokeStyle", "#0f0",
		"ellipse", 0, 0, 1, 1, 0, 0, TAU
	],
	shot: [
		"strokeStyle", "#f00",
		"moveTo", 0.4,-1.0,
		"lineTo", 1.0,-0.4,
		"lineTo", 0.2, 0.4,
		"lineTo",-0.4,-0.2,
		"lineTo", 0.4,-1.0,
		"stroke", "beginPath",
		"strokeStyle", "#ff0",
		"moveTo",-0.4, 1.0,
		"lineTo",-1.0, 0.4,
	],
	missile: [ // err, redo this one?
		"moveTo",-1, 0,
		"lineTo", 1,-1,
		"lineTo", 0, 1
	],
	sniper: [
		"strokeStyle", "#ff0",
		"moveTo",-0.5, 1,
		"lineTo", 1,  -1,
		"lineTo",-1, 0.5
	],
	flame: [
		"strokeStyle", "#f00",
		"ellipse", 0, 0, 1, 1, 0, 0, TAU * 0.5,
		"moveTo", -1, 0,
		"lineTo", -0.5, -1,
		"lineTo", 0, -0.2,
		"lineTo", 0.5, -1,
		"lineTo", 1, 0,
		"stroke", "beginPath",
		"strokeStyle", "#ff0",
		"ellipse", 0, 0.2, 0.3, 0.3, 0, 0, TAU
	],
}
