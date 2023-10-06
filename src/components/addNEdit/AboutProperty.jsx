import '../../../styles/aboutproperty.scss';
import Label from '../../common/Label';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useState } from 'react';

export const AboutProperty = ({ handleChange, formState }) => {
	const [stateOfIcon, setStateOfIcon] = useState(false);
	const [show, setShow] = useState('closed');

	const changeStateHandler = () => {
		setStateOfIcon((icon) => !icon);
		setShow((state) => (state === 'closed' ? 'show' : 'closed'));
	};

	return (
		<div className="about-property-container">
			<div className="about-property-block-text">
				<h1 className="about-property-text">About Property</h1>
				{stateOfIcon ? (
					<div className="expand-less-icon">
						<ExpandLessIcon onClick={changeStateHandler} />
					</div>
				) : (
					<div className="expand-more-icon">
						<ExpandMoreIcon onClick={changeStateHandler} />
					</div>
				)}
			</div>
			<div
				id={show}
				className="about-property-fields-container">
				<div className="main-metrics-field-1">
					<Label className="main-metrics-label">Name</Label>
					<Label className="input-field">
						<input
							className="main-metrics-input"
							type="text"
						/>
					</Label>
				</div>
				<div className="main-metrics-field-1">
					<Label className="main-metrics-label">Location</Label>
					<Label className="input-field">
						<input
							className="main-metrics-input"
							type="text"
						/>
					</Label>
				</div>
				<div className="main-metrics-field-2">
					<Label className="main-metrics-label">Coordinates</Label>
					<Label className="input-field-small">
						<div className="small-div-for-double-input">
							<div>
								<input
									className="main-metrics-input-small"
									type="text"
									value={formState.coordinate_x}
									onChange={handleChange}
								/>
								{/* <span className="text-near-input-about-2">X</span> */}
							</div>
							<div>
								<input
									className="main-metrics-input-small"
									type="text"
								/>
								{/* <span className="text-near-input-about-3">Y</span> */}
							</div>
						</div>
					</Label>
				</div>
				<div className="main-metrics-field-1">
					<Label className="main-metrics-label">Developer</Label>
					<Label className="input-field">
						<input
							className="main-metrics-input"
							type="text"
						/>
					</Label>
				</div>
				<div className="main-metrics-field-1">
					<Label className="main-metrics-label">Developer Specs Title</Label>
					<Label className="input-field">
						<input
							className="main-metrics-input"
							type="text"
							name="developer_specs_title"
							value={formState.developer_specs_title}
							onChange={handleChange}
						/>
					</Label>
				</div>
				<div className="main-metrics-field-1">
					<Label className="main-metrics-label">DeveloperSpecs Subtitle</Label>
					<Label className="input-field">
						<input
							className="main-metrics-input"
							type="text"
						/>
					</Label>
				</div>
				<div className="main-metrics-field-1">
					<Label className="main-metrics-label">Type</Label>
					<Label className="input-field">
						<select
							className="main-metrics-select"
							type="text"></select>
					</Label>
				</div>
				<div className="main-metrics-field-1">
					<Label className="main-metrics-label">Bed(#)</Label>
					<Label className="input-field">
						<input
							className="main-metrics-input"
							type="number"
						/>
						{/* <span className="text-near-input-about">#</span> */}
					</Label>
				</div>
				<div className="main-metrics-field-1">
					<Label className="main-metrics-label">Meter (Sq.Ft)</Label>
					<Label className="input-field">
						<input
							className="main-metrics-input"
							type="number"
						/>
						{/* <span className="text-near-input-about-1">Sq.Ft</span> */}
					</Label>
				</div>
				<div className="main-metrics-field-1">
					<Label className="main-metrics-label">Location</Label>
					<Label className="input-field">
						<textarea
							className="about-property-textarea"
							type="text"
						/>
					</Label>
				</div>
			</div>
		</div>
	);
};
