import './App.scss';
import { useRoutes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import { PropertiesPage } from './pages/PropertiesPage';
import { AddPropertyPage } from './pages/AddPropertyPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

	if (!isLoggedIn) {
		return <Navigate to="/login" />;
	}

	return element;
};

function App() {
	const routing = useRoutes([
		{
			path: '/login',
			element: <LoginPage />,
		},
		{
			path: '/',
			element: <ProtectedRoute element={<PropertiesPage />} />,
		},
		{
			path: '/add',
			element: <ProtectedRoute element={<AddPropertyPage />} />,
		},
		{
			path: '*',
			element: <NotFoundPage />,
		},
	]);

	return <>{routing}</>;
}

export default App;
