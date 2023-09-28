import DubX from '../../../assets/images/DubX.svg';
import '../../../styles/navmenu.scss';
import magnify_glass from '../../../assets/images/magnifyingglass.svg';
import Button from '../../../common/Button';
import Label from '../../../common/Label';

export const NavMenu = () => {
	const handleClick = () => {
		localStorage.clear();
		window.location.reload();
	};

	return (
		<nav className="nav-menu">
			<div className="nav-menu-actions">
				<div className="nav-menu-logo">
					<img
						className="dubX-logo"
						src={DubX}
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
							/>
						</Label>
					</div>
				</div>
			</div>

			<div className="nav-button-container">
				<Button
					className={'nav-menu-button'}
					clickHandler={handleClick}>
					<Label className={'nav-label-button'}>Log Out</Label>
				</Button>
			</div>
		</nav>
	);
};
