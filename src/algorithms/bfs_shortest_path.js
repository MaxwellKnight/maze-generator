import { validateRange, DIRECTIONS_CONST, getDirection, getCoordinateKey } from "./utils";
const { UP, RIGHT, BOTTOM, LEFT } = DIRECTIONS_CONST;

//validate neighbor is in range and unvisited
const validateNeighbor = (direction, source, destination, rows, columns, visited, maze) => {
	//neighbor coords
	const x = source.x + destination.x;
	const y = source.y + destination.y;
	const range = validateRange(x, y, rows, columns);
	const isPathExist = range && maze[source.x][source.y][direction] !== "0";
	const isVisited = !visited.has(`${x},${y}`);

	return destination && isPathExist && isVisited;
}
//get all unvisited neighbors for single cell
const getNeighbors = (source, rows, columns, maze, visited) => {
	const neighbors = [];

	for (let direction of [UP, RIGHT, BOTTOM, LEFT]) {
		const destination = getDirection(direction);
		const x = source.x + destination.x;
		const y = source.y + destination.y;
		if (validateNeighbor(direction, source, destination, rows, columns, visited, maze))
			neighbors.push({ x, y, direction });
	}
	return neighbors;
}

/**
 * input - 
 * 	path: {source, destination}, 2D array of strings
 * output -
 * 	returns shortest path if exists
 * 	else undefined
 */
const bfs_shortest_path = ({ source, destination }, maze) => {
	const queue = [], trail = [], visited = new Set();
	const start = { x: source.x, y: source.y, path: [], distance: 0 };
	let shortest = []

	//push the starting cell to the queue
	queue.push(start);
	//while the queue is not empty
	while (queue.length > 0) {
		//get the first element in the queue
		const current = queue.shift();
		const currentKey = getCoordinateKey(current.x, current.y);
		trail.push(current);

		//if cell has been visited then skip iteration
		if (visited.has(currentKey)) continue;
		visited.add(currentKey);

		//if at destination then add the current cell to the prev and return
		if (current.x === destination.x && current.y === destination.y) {
			shortest = [...current.path, current];
			return [shortest, trail];
		}

		//get all unvisited neighbors and push them to the queue
		const neighbors = getNeighbors(current, maze.length, maze[0].length, maze, visited);
		for (let neighbor of neighbors) {
			const newNeighbor = { ...neighbor, path: [...current.path, current], distance: current.distance + 1 };
			queue.push(newNeighbor);
		}
	}
	return undefined;
}

export { bfs_shortest_path }