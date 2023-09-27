import DubX from '../../assets/logo-assets/DubX.svg';
import Button from '../reusable/button';
import Label from '../reusable/label';
import '../list-of-properties/navmenu.css';
import magnify_glass from '../../assets/logo-assets/magnifyingglass.svg';

export const NavMenu = () => {
	return (
		<div className="nav-menu">
			<div className="nav-menu-logo">
				<img
					className="dubX-logo"
					src={DubX}
					alt=""
				/>
			</div>
			<div className="nav-menu-actions">
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
				<div className="nav-button-container">
					<Button className={'nav-menu-button'}>
						<Label className={'nav-label-button'}>Log out</Label>
					</Button>
				</div>
			</div>
		</div>
	);
};
