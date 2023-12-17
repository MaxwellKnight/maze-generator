import { DIRECTIONS_CONST, getDirection, validateRange, mapDirection, getCoordinateKey } from './utils';
const { UP, RIGHT, BOTTOM, LEFT } = DIRECTIONS_CONST;

/*
get all walls; "1" means a wall exists, and "0" means it doesn't
	0		  0		 0		    0
	UP		RIGHT		DOWN		LEFT
*/
const getWalls = (currentWall, direction) =>
	currentWall.substring(0, direction) + "1" + currentWall.substring(direction + 1);

const validateNeighbor = (direction, source, rows, columns, visited) => (
	direction
	&& validateRange(source.x + direction.x, source.y + direction.y, rows, columns)
	&& !visited.has(getCoordinateKey(direction.x + source.x, direction.y + source.y))
)

//get all unvisited neighbors
const getNeighbors = (source, visited, rows, columns) => {
	const unvisitedList = [];

	for (let direction of [UP, RIGHT, BOTTOM, LEFT]) {
		const destination = getDirection(direction);
		//final destination cell coords
		const x = source.x + destination.x;
		const y = source.y + destination.y;
		if (validateNeighbor(destination, source, rows, columns, visited))
			unvisitedList.push({ x, y, direction });
	}
	return unvisitedList;
}
/**
 * input - 
 * 	path: integers (rows, columns)
 * output -
 * 	returns randomized maze by using randomized DFS
 */
const getMaze = (rows, columns) => {
	const maze = Array(rows).fill().map(() => Array(columns).fill('0000'));
	const stack = [], trail = [], visited = new Set();
	//choose starting cell
	const start = { x: 0, y: 0 };
	//push starting cell to the stack and add it to the visited set
	stack.push(start);
	visited.add(getCoordinateKey(start.x, start.y));

	//while the stack in not empty
	while (stack.length > 0) {
		//pop the last element from the stack and get all it's unvisited neighbors
		const current = stack.pop();
		const unvisitedList = getNeighbors(current, visited, rows, columns);
		trail.push(current);

		if (unvisitedList.length > 0) {
			//if the current cell has any unvisited neighbors push the current cell to the stack
			stack.push(current);

			//choose one of the unvisited neighbors
			const destination = Math.floor(Math.random() * unvisitedList.length);
			const nxtCell = unvisitedList[destination];

			//remove the wall between the cells
			maze[current.x][current.y] = getWalls(maze[current.x][current.y], nxtCell.direction);
			maze[nxtCell.x][nxtCell.y] = getWalls(maze[nxtCell.x][nxtCell.y], mapDirection(nxtCell.direction));

			//add the chosen cell to the visited set and push it to the stack
			visited.add(getCoordinateKey(nxtCell.x, nxtCell.y));
			stack.push(nxtCell);
		}
	}
	return [maze, trail];
}
export { getMaze }