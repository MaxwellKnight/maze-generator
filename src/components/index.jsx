import Board from './Board';
import '../styles/index.css';

const App = () => {

	return (
		<div className="maze">
			<Board rows={20} columns={40} delay={5} />
		</div>
	)
}

export default App
