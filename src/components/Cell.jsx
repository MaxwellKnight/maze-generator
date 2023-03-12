import '../styles/cell.css';

const BORDER_ACTIVE = 0

const getClassList = (borders, current, cell, destination) => {
	let cellClass = 'table-cell '
	const { top, right, bottom, left } = borders;
	if (cell.length > 4) cellClass += 'on-path ';
	if (destination) cellClass += 'destination-cell '
	if (top === right && right === bottom && bottom === left && left === BORDER_ACTIVE) return 'unvisited';
	if (top === BORDER_ACTIVE) cellClass += 'top ';
	if (right === BORDER_ACTIVE) cellClass += 'right ';
	if (bottom === BORDER_ACTIVE) cellClass += 'bottom ';
	if (left === BORDER_ACTIVE) cellClass += 'left ';
	if (current) cellClass += 'active ';
	return cellClass;
}

const Cell = ({ ...props }) => {
	const { borders, current } = props;
	const [top, right, bottom, left] = borders.split('').map(Number);

	return (
		<td className={getClassList({ top, right, bottom, left }, current, props.cell, props.destination)}>
		</td>
	)
}

export default Cell;