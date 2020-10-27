import { CellGenerator, CellDrawer } from './cell';

const sidebarWidth = 300;

const generator = new CellGenerator();

class Sidebar {
	constructor (x, height) {
		this.width = sidebarWidth;
		this.height = height;

		this.color = '#fae7b5';
		this.borderColor = '#000';

		this.x = x;
		this.y = 0;

		this.gap = 40;
		this.border = 5;

		this.cellWidth = 30;
		this.cellHeight = 50;
	}
}

export class Field {
	constructor (width, height) {
		this.width = width;
		this.height = height;

		this.sidebar = new Sidebar(this.width - sidebarWidth, this.height);

		this.cells = this.getCells();
	}

	getCells () {
		const cells = [];
		const sidebar = this.sidebar;

		for (let k = 1; k < 6; k += 2) {
			for (let i = 0; i < 2; i++) {
				for (let j = 0; j < 4; j++) {
					const type = j ? 'close': Object.keys(CellGenerator.list)[k - i - 1];
					const x = sidebar.x + sidebar.gap + sidebar.cellWidth*k + sidebar.cellWidth * i;
					const y = sidebar.y + sidebar.gap + sidebar.cellHeight * 2 * j + sidebar.cellHeight * i;
					cells.push(generator.create(x, y, type));
				}
			}
		}

		return cells;
	}
}

export class FieldDrawer {
	constructor (field) {
		this.field = field;
	}

	canvas (ctx) {
		const sidebar = this.field.sidebar;

		ctx.fillStyle = sidebar.borderColor;
		ctx.fillRect(sidebar.x - sidebar.border, sidebar.y, sidebar.border, sidebar.height);
		ctx.fillStyle = sidebar.color;
		ctx.fillRect(sidebar.x, sidebar.y, sidebar.width, sidebar.height);

		const drawer = new CellDrawer(this.field.cells);
		drawer.canvas(ctx);

		ctx.fillStyle = '#f0b727';
		ctx.fillRect(0, 0, sidebar.x - sidebar.border, sidebar.height);
	}
}
