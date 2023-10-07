import './App.scss';
import { useRoutes } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { ListOfPropPage } from './pages/ListOfPropPage';
import { AddNEditPage } from './pages/AddNEditPage';
import { NotFound } from './pages/NotFound';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/login" />
  }

  return element;
}

function App() {
	const routing = useRoutes([
		{
			path: '/login',
			element: <LoginPage />,
		},
		{
			path: '/',
			element: <ProtectedRoute element={<ListOfPropPage />} />,
		},
		{
			path: '/add',
			element: <ProtectedRoute element={<AddNEditPage />} />
		},
		{
			path: '*',
			element: <NotFound />
		},
	]);

	return <>{routing}</>;
}

export default App;
