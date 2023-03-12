import Board from './Board';
import '../styles/index.css';

const App = () => {

	return (
		<div className="maze">
			<Board rows={30} columns={60} delay={5} />
		</div>
	)
}

export default App
