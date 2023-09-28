import './App.css';
import { Routes, Route } from 'react-router-dom';
import { ListOfProp } from './components/listOfProperties/props/ListOfProp';
import { Login } from './components/login/Login';

function App() {
	return (
		<>
			<Routes>
				<Route
					path="/list-of-props"
					element={<ListOfProp />}
				/>
				<Route
					path="/login-window"
					element={<Login />}
				/>
			</Routes>
		</>
	);
}

export default App;
