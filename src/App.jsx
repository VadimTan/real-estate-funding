import './App.scss';
import { useRoutes } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { ListOfPropPage } from './pages/ListOfPropPage';
import { AddNEditPage } from './pages/AddNEditPage';

function App() {
	const routing = useRoutes([
		{
			path: '/',
			element: <LoginPage />,
		},
		{
			path: '/properties',
			element: <ListOfPropPage />,
		},
		{
			path: '/properties/add',
			element: <AddNEditPage />,
		},
	]);

	return <>{routing}</>;
}

export default App;
