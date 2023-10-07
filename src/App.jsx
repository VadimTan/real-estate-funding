import './App.scss';
import { useRoutes } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { ListOfPropPage } from './pages/ListOfPropPage';
import { AddNEditPage } from './pages/AddNEditPage';

function App() {
	const routing = useRoutes([
		{
			path: '/login',
			element: <LoginPage />,
		},
		{
			path: '/',
			element: <ListOfPropPage />,
		},
		{
			path: '/add',
			element: <AddNEditPage />,
		},
	]);

	return <>{routing}</>;
}

export default App;
