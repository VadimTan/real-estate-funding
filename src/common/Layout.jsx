import { NavMenu } from '../components/Navigation/NavMenu';

// eslint-disable-next-line react/prop-types
export const Layout = ({ children }) => {
	return (
		<>
			<NavMenu />
			{children}
		</>
	);
};

export default Layout;
