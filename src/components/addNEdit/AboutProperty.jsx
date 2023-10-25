import '../../../styles/aboutproperty.scss';
import Label from '../../common/Label';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useState } from 'react';
import Button from '../../common/Button';

export const AboutProperty = ({
	handleChange,
	formState,
	onSubmit,
	isAddMode,
	onUpdate,
}) => {
	const [stateOfIcon, setStateOfIcon] = useState(false);
	const [show, setShow] = useState('closed');

	const changeStateHandler = () => {
		setStateOfIcon((icon) => !icon);
		setShow((state) => (state === 'closed' ? 'show' : 'closed'));
	};

	return (
		<div className="about-property-container">
			<div
				className="about-property-block-text"
				onClick={changeStateHandler}>
				<h1 className="about-property-text">About Property</h1>
				{stateOfIcon ? (
					<div className="expand-less-icon">
						<ExpandLessIcon />
					</div>
				) : (
					<div className="expand-more-icon">
						<ExpandMoreIcon />
					</div>
				)}
			</div>
			<div
				id={show}
				className="about-property-fields-container">
				<div className="main-metrics-field-1">
					<Label className="main-metrics-label">Name</Label>
					<div className="input-field">
						<input
							className="main-metrics-input"
							type="text"
							name="name"
							value={formState.name}
							onChange={handleChange}
						/>
					</div>
				</div>
				<div className="main-metrics-field-1">
					<Label className="main-metrics-label">Location</Label>
					<div className="input-field">
						<input
							className="main-metrics-input"
							type="text"
							name="location"
							value={formState.location}
							onChange={handleChange}
						/>
					</div>
				</div>
				<div className="main-metrics-field-2">
					<Label className="main-metrics-label">Coordinates</Label>
					<div className="input-field-small">
						<div className="small-div-for-double-input">
							<div className="relative">
								<input
									className="main-metrics-input-small"
									type="text"
									name="coordinate_x"
									value={formState.coordinate_x}
									onChange={handleChange}
								/>
								<span className="text-near-input-about-2">X</span>
							</div>
							<div className="relative">
								<input
									className="main-metrics-input-small"
									type="text"
									name="coordinate_y"
									value={formState.coordinate_y}
									onChange={handleChange}
								/>
								<span className="text-near-input-about-3">Y</span>
							</div>
						</div>
					</div>
				</div>
				<div className="main-metrics-field-1">
					<Label className="main-metrics-label">Developer</Label>
					<div className="input-field">
						<input
							className="main-metrics-input"
							type="text"
							name="developer"
							value={formState.developer}
							onChange={handleChange}
						/>
					</div>
				</div>
				<div className="main-metrics-field-1">
					<Label className="main-metrics-label">Developer Specs Title</Label>
					<div className="input-field">
						<input
							className="main-metrics-input"
							type="text"
							name="developer_specs_title"
							value={formState.developer_specs_title}
							onChange={handleChange}
						/>
					</div>
				</div>
				<div className="main-metrics-field-1">
					<Label className="main-metrics-label">Developer Specs Subtitle</Label>
					<div className="input-field">
						<input
							className="main-metrics-input"
							type="text"
							name="developer_specs_subtitle"
							value={formState.developer_specs_subtitle}
							onChange={handleChange}
						/>
					</div>
				</div>
				<div className="main-metrics-field-1">
					<Label className="main-metrics-label">Type</Label>
					<div className="input-field">
						{/* TODO: Add Options */}
						<select
							className="main-metrics-select"
							type="text"
							name="type"
							onChange={handleChange}
							value={formState.type}>
							<option></option>
							<option value={'Off-plan'}>Off-plan</option>
							<option value={'Ready'}>Ready</option>
						</select>
					</div>
				</div>
				<div className="main-metrics-field-1">
					<Label className="main-metrics-label">Bed</Label>
					<div className="input-field">
						<input
							className="main-metrics-input"
							type="number"
							name="bed"
							value={formState.bed}
							onChange={handleChange}
						/>
						<span className="text-near-input-about">#</span>
					</div>
				</div>
				<div className="main-metrics-field-1">
					<Label className="main-metrics-label">Meter (Sq.Ft)</Label>
					<div className="input-field">
						<input
							className="main-metrics-input"
							type="number"
							name="meter"
							value={formState.meter}
							onChange={handleChange}
						/>
						<span className="text-near-input-about-1">Sq.Ft</span>
					</div>
				</div>
				<div className="main-metrics-field-1">
					<Label className="main-metrics-label">About The Property</Label>
					<div className="input-field">
						<textarea
							className="about-property-textarea"
							type="text"
							name="about"
							value={formState.about}
							onChange={handleChange}
						/>
					</div>
				</div>
				<div
					id={show}
					className="button-submit-save">
					<Button
						type="submit"
						className="footer-button-show"
						clickHandler={isAddMode ? onSubmit : onUpdate}>
						<span className="text-for-button">
							{isAddMode ? 'Save Changes' : 'Update Changes'}
						</span>
					</Button>
				</div>
			</div>
		</div>
	);
};
