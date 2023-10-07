import filled from '../../assets/images/filled.svg';
import '../../../styles/addnedit.scss';
import IOSSwitch from '../../common/IOSSwitch';
import { useNavigate } from 'react-router-dom';

export const AddNEdit = () => {
	const navigate = useNavigate();

	const handleNavigate = () => {
		navigate('/', { replace: true });
	};

	return (
		<>
			<div className="container-add-edit">
				<div className="header-of-container">
					<div className="arrow-header-of-container-block">
						<img
							src={filled}
							alt=""
							onClick={handleNavigate}
						/>
						<div className="h1-for-header-of-container">
							<h1 className="h1-header">1 Bed in Old Town Downtown Dubai</h1>
						</div>
					</div>
					<div className="toggle-container">
						<div className="toggle-sold">
							<span className="text-for-toggle-sold">Sold</span>
							<IOSSwitch />
						</div>
						<div className="toggle-completed">
							<span className="text-for-toggle-completed">Completed</span>
							<IOSSwitch />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AddNEdit;
