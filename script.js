const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");
const size = 550;
const scale = 5.5;
const resolution = size / scale;
const startBtn = document.querySelector("#start");
const clearBtn = document.querySelector("#clear");

let cells;

setup();
randomCells();
drawCells();

setInterval(step, 50);

startBtn.addEventListener("click", () => {
	setup();
	randomCells();
});

clearBtn.addEventListener("click", () => {
	setup();
});

function setup() {
	canvas.width = size;
	canvas.height = size;
	context.scale(scale, scale);
	context.fillStyle = "black";
	cells = createCells();
}

function createCells() {
	let rows = new Array(resolution);
	for (let x = 0; x < resolution; x++) {
		let cols = new Array(resolution);
		for (let y = 0; y < resolution; y++) {
			cols[y] = false;
		}
		rows[x] = cols;
	}
	return rows;
}

function randomCells() {
	for (let y = 0; y < resolution; y++) {
		for (let x = 0; x < resolution; x++) {
			if (Math.random() < 0.3) cells[x][y] = true;
		}
	}
}

function drawCells() {
	context.fillStyle = "white";
	context.fillRect(0, 0, resolution, resolution);
	context.fillStyle = "black";
	for (let y = 0; y < resolution; y++) {
		for (let x = 0; x < resolution; x++) {
			if (cells[x][y]) context.fillRect(x, y, 1, 1);
		}
	}
}

function step() {
	let newCells = createCells();
	for (let y = 0; y < resolution; y++) {
		for (let x = 0; x < resolution; x++) {
			const neighbours = getNeighbourCount(x, y);
			if (cells[x][y] && neighbours >= 2 && neighbours <= 3)
				newCells[x][y] = true;
			else if (!cells[x][y] && neighbours === 3) newCells[x][y] = true;
		}
	}
	cells = newCells;
	drawCells();
}

function getNeighbourCount(x, y) {
	let count = 0;
	for (let yy = -1; yy < 2; yy++) {
		for (let xx = -1; xx < 2; xx++) {
			if (xx === 0 && yy === 0) continue;
			if (x + xx < 0 || x + xx > resolution - 1) continue;
			if (y + yy < 0 || y + yy > resolution - 1) continue;
			if (cells[x + xx][y + yy]) count++;
		}
	}
	return count;
}
