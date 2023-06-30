function buildGrid(size) {


	function makePixel() {
		let pixel = document.createElement('div');

		pixel.classList.add('pixel');

		/* Styling */
		pixel.style.display = 'flex';
		pixel.style.width = '100%';
		pixel.style.height = '100%';
		// pixel.style.backgroundColor = bgColor;
		// pixel.style.border = borderStyling;

		pixel.addEventListener('mouseenter', () => {
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
	while (display.firstChild) {
		display.firstChild.remove();
	}
	
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

function drawOn(selector, drawMode) {
	selector.style.backgroundColor = drawMode;
}

let brushColor = 'purple';

let drawMode_HardColor = function() {
	return brushColor;
}

let drawMode_Greyscale = function() {
	
}

const display = document.querySelector('.screen');

const bgColor = 'white';
const borderStyling = '0px solid black';

let currentMode = drawMode_HardColor();

buildGrid(8);

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
