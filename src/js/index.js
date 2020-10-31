import { Field, FieldDrawer } from './field';
import '../styles.css';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

canvas.width = document.body.clientWidth;
canvas.height = innerHeight - 12;

const field = new Field(canvas.width, canvas.height);
const fieldDrawer = new FieldDrawer(field);

fieldDrawer.canvas(ctx);

canvas.addEventListener('click', evt => {
	field.cells.forEach((cell, i, arr) => {
		const count = arr.filter(item => item.borderColor === 'green').length;
		if (Math.hypot(evt.offsetX - cell.x, evt.offsetY - cell.y) <= 25 &&
		    cell.color != '#fff') {
			if (cell.borderColor === '#000' && count < 2) {
				cell.borderColor = 'green';
			} else if (cell.borderColor === 'green') {
				cell.borderColor = '#000';
			}
		}
	})
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	fieldDrawer.canvas(ctx)
})
