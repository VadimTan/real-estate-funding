import DubX from '../../assets/images/DubX.svg';
import '../../../styles/navmenu.scss';
import magnify_glass from '../../assets/images/magnifyingglass.svg';
import Button from '../../common/Button';
import Label from '../../common/Label';
import { logout, filterProperties } from '../../redux/auth.slice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const NavMenu = () => {
	const [searchValue, setSearchValue] = useState('');
	const dispatch = useDispatch();
	const nav = useNavigate();

	const handleLogout = () => {
		dispatch(logout());
		nav('/login');
	};

	const handleRedirect = () => {
		nav('/');
	};

	const handleSearch = (e) => {
		setSearchValue(e.target.value);
		dispatch(filterProperties(searchValue));
	};

	return (
		<nav className="nav-menu">
			<div className="nav-menu-actions">
				<div className="nav-menu-logo">
					<img
						className="dubX-logo"
						src={DubX}
						onClick={handleRedirect}
						alt=""
					/>
				</div>
				<div className="frame-11">
					<div className="search-field">
						<Label
							type="text"
							className="nav-menu-label">
							<img
								src={magnify_glass}
								className="magnify-glass-input"
							/>
							<input
								type="text"
								className="nav-menu-input"
								placeholder="Search"
								onChange={(e) => handleSearch(e)}
							/>
						</Label>
					</div>
				</div>
			</div>

			<div className="nav-button-container">
				<Button
					className="nav-menu-button"
					clickHandler={handleLogout}>
					<span className="nav-label-button">Log Out</span>
				</Button>
			</div>
		</nav>
	);
};
