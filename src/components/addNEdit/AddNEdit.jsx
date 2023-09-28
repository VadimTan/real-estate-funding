import filled from '../../assets/images/filled.svg';
import { NavMenu } from '../listOfProperties/navigation/NavMenu';
import '../../styles/addnedit.scss';

export const AddNEdit = () => {
	return (
		<>
			<NavMenu />
			<div className="container-add-edit">
				<div className="header-of-container">
					<div className="arrow-header-of-container-block">
						<img
							src={filled}
							alt=""
						/>
						<div className="h1-for-header-of-container">
							<h1 className="h1-header">1 Bed in Old Town Downtown Dubai</h1>
						</div>
					</div>

					<div className="toggle-container">
						<div className="toggle-sold">
							<span className="text-for-toggle-sold">Sold</span>
						</div>
						<div className="toggle-completed">
							<span className="text-for-toggle-completed">Completed</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
