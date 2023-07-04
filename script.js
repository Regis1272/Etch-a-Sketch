function clearGrid() {
	while (display.firstChild) {
		display.firstChild.remove();
	}
}

function buildGrid(size, opacity) {


	function makePixel() {
		let pixel = document.createElement('div');

		pixel.classList.add('pixel');

		/* Styling */
		pixel.style.display = 'flex';
		pixel.style.width = '100%';
		pixel.style.height = '100%';
		if (opacity === true) {
			pixel.style.backgroundColor = 'black';
			pixel.style.opacity = '0';
		}
		// pixel.style.backgroundColor = bgColor;
		// pixel.style.border = borderStyling;

		pixel.addEventListener('mouseenter', () => {
			drawOn(pixel, currentMode);
		});
		pixel.addEventListener('mousedown', () => {
			drawOn(pixel, currentMode);
		});

		return pixel;
	}

	function makeRow() {
		let row = document.createElement('div');

		row.classList.add('row');

		row.style.display = 'flex';
		row.style.width = '100%';
		row.style.height = '100%';
		// row.style.border = borderStyling;

		return row;
	}
	
	// ^^^ Functions ^^^
	// vvv Code      vvv
	
	// wipe current grid clean
	clearGrid();
	
	for (let y = 1; y <= size; y++) { // new row
		
		let newRow = makeRow();
		
		for (let x = 1; x <= size; x++) { // new square

			let newSquare = makePixel();
			console.log('inserting new square at x = ' + x);
			newRow.appendChild(newSquare);
		}

		console.log('inserting new row at y = ' + y);
		display.appendChild(newRow);
	}

}

/* ---------- Drawing Functionality ---------- */


function drawOn(selector, drawMode) {
	// If left mouse button is down
	if (event.buttons === 1) {
		// draw in selected style
		if (drawMode === drawMode_Greyscale) {
			selector.style.opacity = drawMode(selector);
		} else {
			selector.style.backgroundColor = drawMode(selector);
		}
	}
}


let drawMode_Palette = function(selector) {
	console.log(selector.style.opacity);
	return brushColor;
}

let drawMode_Greyscale = function(selector) {
	console.log(selector.style.opacity);
	if (selector.style.opacity < 1) {
		let scale = Number(selector.style.opacity) + 0.1;
		console.log(scale);
		return scale;
	}
}

let drawMode_Rainbow = function(selector) {
	let r = Math.floor(Math.random()*255);
	let g = Math.floor(Math.random()*255);
	let b = Math.floor(Math.random()*255);
	return `rgb(${r}, ${g}, ${b})`;
}

let brushColor = 'black';
let currentMode = drawMode_Palette;
const bgColor = 'white';
const borderStyling = '0px solid black';

/* ---------- Buttons + Event Listeners ---------- */

// Set up display and user-interaction elements
const display = document.querySelector('.screen');

const clearBtn = document.getElementById('clear');
const screenSlider = document.getElementById('screenSlider');

const colorPkr = document.getElementById('colorPicker')
const modePaletteBtn = document.getElementById('paletteBtn');
const modeGreyscaleBtn = document.getElementById('greyscaleBtn');
const modeRainbowBtn = document.getElementById('rainbowBtn');

let palette = document.getElementById('palette');

clearBtn.addEventListener('click', () => {
	buildGrid(screenSlider.value);
});

screenSlider.addEventListener('change', () => {
	buildGrid(screenSlider.value);
});

colorPkr.addEventListener('input', () => {
	brushColor = colorPkr.value;
});

modePaletteBtn.addEventListener('click', () => {
	if (currentMode !== drawMode_Palette) {
		buildGrid(screenSlider.value, false);
		palette.style.visibility = 'visible';
		currentMode = drawMode_Palette;
	}
});

modeGreyscaleBtn.addEventListener('click', () => {
	if (currentMode !== drawMode_Greyscale) {
		buildGrid(screenSlider.value, true);
		palette.style.visibility = 'hidden';
		currentMode = drawMode_Greyscale;
	}
});

modeRainbowBtn.addEventListener('click', () => {
	if (currentMode !== drawMode_Rainbow) {
		buildGrid(screenSlider.value, false);
		palette.style.visibility = 'hidden';
		currentMode = drawMode_Rainbow
	}
});



buildGrid(screenSlider.value);

// build the grid
// 	a single square will handle a hover event
// 	build a div containing row of input size
// 		build the input number of these rows
//
// draw on the grid
// 	when event is detected >>>
// 	>>> draw
// 		set background-color of square = to color
//
// reset the grid
