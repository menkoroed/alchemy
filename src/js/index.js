import { Field, FieldDrawer } from './field';
import { CellDrawer } from './cell';
import '../styles.css';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

canvas.width = document.body.clientWidth;
canvas.height = innerHeight - 12;

const field = new Field(canvas.width, canvas.height);
const fieldDrawer = new FieldDrawer(field);

fieldDrawer.canvas(ctx);

canvas.addEventListener('click', evt => {
	for (let i = 0; i < field.cells.length; i++) {
		const cell = field.cells[i];
		if (Math.hypot(evt.offsetX - cell.x, evt.offsetY - cell.y) <= 25) {
			if (cell.borderColor === '#000') {
				cell.borderColor = 'green';
			} else if (cell.borderColor === 'green') {
				cell.borderColor = '#000';
			}
		}
	}
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	fieldDrawer.canvas(ctx)
})
