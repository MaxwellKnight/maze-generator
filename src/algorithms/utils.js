const DIRECTIONS_CONST = {
	UP: 0,
	RIGHT: 1,
	BOTTOM: 2,
	LEFT: 3
}
const { UP, RIGHT, BOTTOM, LEFT } = DIRECTIONS_CONST;

const getDirection = direction => {
	switch (direction) {
		case UP: return { x: -1, y: 0, direction: UP };
		case RIGHT: return { x: 0, y: 1, direction: RIGHT };
		case BOTTOM: return { x: 1, y: 0, direction: BOTTOM };
		case LEFT: return { x: 0, y: -1, direction: LEFT };
	}
	return undefined;
}

const mapDirection = direction => {
	switch (direction) {
		case UP: return BOTTOM;
		case RIGHT: return LEFT;
		case BOTTOM: return UP;
		case LEFT: return RIGHT;
	}
	return 0;
}

const validateRange = (x, y, rows, columns) => (0 <= x && x < rows) && (0 <= y && y < columns)

export { DIRECTIONS_CONST, getDirection, validateRange, mapDirection }