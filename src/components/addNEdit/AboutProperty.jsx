import '../../../styles/aboutproperty.scss';
import Label from '../../common/Label';

export const AboutProperty = () => {
	return (
		<div className="about-property-container">
			<div className="about-property-block-text">
				<h1 className="about-property-text">About Property</h1>
			</div>
			<div className="main-metrics-fields-container">
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
					<Label className="main-metrics-label">Bed</Label>
					<Label className="input-field">
						<input
							className="main-metrics-input"
							type="text"
						/>
						{/* <span className="text-near-input-about">#</span> */}
					</Label>
				</div>
				<div className="main-metrics-field-1">
					<Label className="main-metrics-label">Meter</Label>
					<Label className="input-field">
						<input
							className="main-metrics-input"
							type="text"
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
