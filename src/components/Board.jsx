import { useEffect, useState } from "react";
import { getMaze } from "../algorithms/dfs_maze";
import { bfs_shortest_path } from "../algorithms/bfs_shortest_path";
import Cell from './Cell';
import '../styles/board.css'

const delayFunction = ms => new Promise(
	resolve => setTimeout(resolve, ms)
);

const Board = ({ rows, columns, delay }) => {
	const [maze, setMaze] = useState(Array(rows).fill().map(() => Array(columns).fill("0000")));
	const [currentCell, setCurrentCell] = useState({ x: 0, y: 0 });
	const [destinationCell, setDestinationCell] = useState(null);
	const [isCreatingMaze, setIsCreatingMaze] = useState(false);
	const [isPath, setIsPath] = useState(true);
	const [reset, setReset] = useState(false);

	async function handleCreateMaze(e) {
		setIsCreatingMaze(true);
		animateMazeDFS();
		await delayFunction(delay * (rows * columns * 2));
		setIsPath(() => false);
	}

	const animateMazeDFS = () => {
		const [finalMaze, trail] = getMaze(rows, columns);
		for (let i = 0; i < trail.length; i += 1) {
			setTimeout(() => {
				const current = trail[i];
				const tempMaze = [...maze];
				tempMaze[current.x][current.y] = finalMaze[current.x][current.y];
				setMaze(() => tempMaze);
				setCurrentCell({ x: current.x, y: current.y });
			}, delay * i);
		}
	}
	const animateShortestPathBFS = () => {
		const [shortest, trail] = bfs_shortest_path({ source: { x: 0, y: 0 }, destination: { x: rows - 1, y: columns - 1 } }, maze);
		for (let i = 0; i < shortest.length; i += 1) {
			setTimeout(() => {
				const current = shortest[i];
				const tempMaze = [...maze];
				tempMaze[current.x][current.y] = maze[current.x][current.y] + "0";
				setMaze(() => tempMaze);
				if (i === shortest.length - 1) {
					setDestinationCell(() => ({ x: current.x, y: current.y }));
					setTimeout(() => setReset(true), delay * 500);
				}
			}, delay * i)
		}

	}

	useEffect(() => {
		if(reset){
			setMaze(Array(rows).fill().map(() => Array(columns).fill("0000")));
			setCurrentCell({x: 0, y: 0});
			setIsCreatingMaze(false);
			setDestinationCell(null);
			setIsPath(true);
			setReset(false);
		}
	}, [reset]);

	return (
		<>
			<div className="controls">
				{!isPath && <button onClick={() => animateShortestPathBFS()}>חשב מסלול</button>}
				<button onClick={() => handleCreateMaze()} disabled={isCreatingMaze}>צור מבוך</button>
			</div>
			<table className="table">
				<tbody>
					{maze.map((row, rIndex) => (
						<tr key={rIndex} className='table-row'>
							{row.map((borders, cIndex) =>
								<Cell
									key={cIndex}
									cell={maze[rIndex][cIndex]}
									destination={destinationCell && destinationCell.x === rIndex && destinationCell.y === cIndex}
									borders={borders}
									current={currentCell.x === rIndex && currentCell.y === cIndex} />
							)}
						</tr>
					))}
				</tbody>
			</table>
		</>
	)
}

export default Board