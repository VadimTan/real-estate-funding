import filled from '../../assets/images/filled.svg';
import '../../../styles/addnedit.scss';
import IOSSwitch from '../../common/IOSSwitch';
import { useNavigate } from 'react-router-dom';

export const AddNEdit = ({ formState, setFormState }) => {
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
							<h1 className="h1-header">{formState.name}</h1>
						</div>
					</div>
					<div className="toggle-container">
						<div className="toggle-sold">
							<span className="text-for-toggle-sold">Sold</span>
							<IOSSwitch
								checked={formState.sold === 1}
								onChange={(event) =>
									setFormState({
										...formState,
										sold: event.target.checked ? 1 : 0,
									})
								}
							/>
						</div>
						<div className="toggle-completed">
							<span className="text-for-toggle-completed">Completed</span>
							<IOSSwitch
								checked={formState.completed === 1}
								onChange={(event) =>
									setFormState({
										...formState,
										completed: event.target.checked ? 1 : 0,
									})
								}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AddNEdit;
