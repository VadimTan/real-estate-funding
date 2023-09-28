import './App.css';
// Navigate,
import { useRoutes } from 'react-router-dom';
import { ListOfProp } from './components/listOfProperties/props/ListOfProp';
import { Login } from './components/login/Login';
import { AddNEdit } from './components/addNEdit/AddNEdit';

function App() {
	const routing = useRoutes([
		{
			path: '/',
			element: <Login />,
			// isLoggedIn ? <Navigate to={'/list-of-props'} /> :
		},
		{
			path: '/list-of-props',
			element: <ListOfProp />,
			//  isLoggedIn ? <ListOfProp /> : <Navigate to={'/login-window'} /
		},
		{
			path: '/add',
			element: <AddNEdit />,
		},
	]);

	return <>{routing}</>;
}

export default App;
