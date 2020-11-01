import { CellGenerator, CellDrawer } from './cell';

const sidebarWidth = 300;

const generator = new CellGenerator();

class Sidebar {
	constructor (x, height) {
		this.width = sidebarWidth;
		this.height = height;

		this.color = '#fae7b5';

		this.x = x;
		this.y = 0;

		this.gap = 40;

		this.cellWidth = 30;
		this.cellHeight = 50;
	}
}

class SidebarDrawer {
	constructor (sidebars) {
		this.sidebars = sidebars;
	}
	
	canvas (ctx) {
		this.sidebars.forEach(sidebar => {
			ctx.fillStyle = sidebar.color;
			ctx.fillRect(sidebar.x, sidebar.y, sidebar.width, sidebar.height);
		})
	}
}

export class Field {
	constructor (width, height) {
		this.width = width;
		this.height = height;

		this.cells = this._getCells();
	}

	get sidebars () {
		const sidebars = [];

		for (let i = 0; i < 2; i++) {
			const x = 0 + (this.width - sidebarWidth) * i;
			sidebars.push(new Sidebar(x, this.height));
		}

		return sidebars;
	}

	_getCells () {
		const cells = [];
		const sidebar = this.sidebars[1];

		for (let k = 1; k < 6; k += 2) {
			for (let i = 0; i < 2; i++) {
				for (let j = 0; j < 4; j++) {
					const x = sidebar.x + sidebar.gap + sidebar.cellWidth*k + sidebar.cellWidth * i;
					const y = sidebar.y + sidebar.gap + sidebar.cellHeight * 2 * j + sidebar.cellHeight * i;
					cells.push(generator.create(x, y, 'close'));
				}
			}
		}

		Object.keys(CellGenerator.basic).forEach((cell, i) => {
			const { x, y } = cells[i];
			cells[i] = generator.create(x, y, cell);
		})

		return cells;
	}
}

export class FieldDrawer {
	constructor (field) {
		this.field = field;
	}

	canvas (ctx) {
		ctx.fillStyle = '#f0b727';
		ctx.fillRect(0, 0, this.field.width, this.field.height);

		const sidebarDrawer = new SidebarDrawer(this.field.sidebars);
		const cellDrawer = new CellDrawer(this.field.cells);

		sidebarDrawer.canvas(ctx);
		cellDrawer.canvas(ctx);


		const transforms = [];
		const sidebar = this.field.sidebars[0];

		for (let i = 0; i < 2; i++) {
			const x = this.field.width / 2 - sidebar.cellWidth*2 + i*(sidebar.cellWidth*2 + sidebar.gap);
			const y = this.field.height / 4;
			transforms.push(generator.create(x, y, 'transform'));
		}

		const transform = new CellDrawer(transforms);
		transform.canvas(ctx);
	}
}
