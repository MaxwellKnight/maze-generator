import Board from './Board';
import '../styles/index.css';

const App = () => {

	return (
		<div className="maze">
			<Board rows={40} columns={80} delay={5} />
		</div>
	)
}

export default App
