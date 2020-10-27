import water from '@asset/water.svg';
import fire from '@asset/fire.svg';
import earth from '@asset/soil.svg';
import air from '@asset/air.svg';
import close from '@asset/question.svg';
import transform from '@asset/transform.svg';

class Cell {
	constructor (x, y) {
		this.x = x;
		this.y = y;

		this.size = 30;
		this.image = new Image();

		this.borderColor = '#000';
	}

	get points () {
		const points = [];

		for (let i = 0; i < 6; i++) {
			const angle = Math.PI / 180 * (60 * i - 30);
			points.push({
				x: this.x + this.size * Math.cos(angle),
				y: this.y + this.size * Math.sin(angle)
			})
		}

		return points;
	}
}

class WaterCell extends Cell {
	constructor (x, y) {
		super(x, y);
		this.color = '#00b5e3';
		this.image.src = water;
	}
}

class FireCell extends Cell {
	constructor (x, y) {
		super(x, y);
		this.color = 'red';
		this.image.src = fire;
	}
}

class AirCell extends Cell {
	constructor (x, y) {
		super(x, y);
		this.color = '#aae2f5';
		this.image.src = air;
	}
}

class EarthCell extends Cell {
	constructor (x, y) {
		super(x, y);
		this.color = '#b86614';
		this.image.src = earth;
	}
}

class CloseCell extends Cell {
	constructor (x, y) {
		super(x, y);
		this.color = '#fff';
		this.image.src = close;
	}
}

class TransformCell extends Cell {
	constructor (x, y) {
		super(x, y);
		this.color = '#fff';
		this.image.src = transform;
	}
}

export class CellDrawer {
	constructor (cells) {
		this.cells = cells;
	}

	canvas (ctx) {
		this.cells.forEach(cell => {
			const points = cell.points;

			ctx.lineWidth = 8;
			ctx.lineCap = 'round';
			ctx.lineJoin = 'round';
			ctx.fillStyle = cell.color;
			ctx.strokeStyle = cell.borderColor;

			ctx.beginPath();
			ctx.moveTo(points[0].x, points[0].y);
			for (let i = 1; i < 6; i++) {
				ctx.lineTo(points[i].x, points[i].y);
			}
			ctx.lineTo(points[0].x, points[0].y);

			ctx.stroke();
			ctx.fill();
			ctx.closePath();

			cell.image.addEventListener('load', () => {
				ctx.drawImage(cell.image, cell.x - cell.image.width / 2, cell.y - cell.image.height / 2);
			})
			ctx.drawImage(cell.image, cell.x - cell.image.width / 2, cell.y - cell.image.height / 2);
		})
	}
}

export class CellGenerator {
	static list = {
		water: WaterCell,
		fire: FireCell,
		air: AirCell,
		earth: EarthCell,
		close: CloseCell,
		transform: TransformCell
	}

	create(x, y, type = 'close') {
		const Cell = CellGenerator.list[type];
		const cell = new Cell(x, y);

		return cell;
	}
}
