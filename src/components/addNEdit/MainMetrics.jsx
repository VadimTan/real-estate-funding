import Label from '../../common/Label';
import '../../../styles/mainmetrics.scss';

export const MainMetrics = () => {
	return (
		<div className="main-metrics-container">
			<div className="main-metrics-block-text">
				<h1 className="main-metrics-text">Main Metrics</h1>
			</div>
			<div className="main-metrics-fields-container">
				<div className="main-metrics-field-1">
					<Label className={'main-metrics-label'}>
						Total Price (общая цена недвижимости)
					</Label>
					<Label className="input-field">
						<input
							className="main-metrics-input"
							type="text"
						/>
						<span className="text-near-input">AED</span>
					</Label>
				</div>
				<div className="main-metrics-field-1">
					<Label className="main-metrics-label">Price</Label>
					<Label className="input-field">
						<input
							className="main-metrics-input"
							type="text"
						/>
						<span className="text-near-input">AED</span>
					</Label>
				</div>
				<div className="main-metrics-field-2">
					<Label className="main-metrics-label">Annual Profit</Label>
					<Label className="input-field-small">
						<div className="small-div-for-double-input">
							<div>
								<input
									className="main-metrics-input-small"
									type="text"
								/>
								<span className="text-near-input-small">%</span>
							</div>
							<div>
								<input
									className="main-metrics-input-small"
									type="text"
								/>
								<span className="text-near-input-small-2">%</span>
							</div>
						</div>
					</Label>
				</div>
				<div className="main-metrics-field-1">
					<Label className="main-metrics-label">Sell Price</Label>
					<Label className="input-field">
						<input
							className="main-metrics-input"
							type="text"
						/>
						<span className="text-near-input">AED</span>
					</Label>
				</div>
				<div className="main-metrics-field-1">
					<Label className="main-metrics-label">App Fee</Label>
					<Label className="input-field">
						<input
							className="main-metrics-input"
							type="text"
						/>
						<span className="text-near-input-app-fee">%</span>
					</Label>
				</div>
				<div className="main-metrics-field-1">
					<Label className="main-metrics-label">Additional Charges</Label>
					<Label className="input-field">
						<input
							className="main-metrics-input"
							type="text"
						/>
						<span className="text-near-input">AED</span>
					</Label>
				</div>
				<div className="main-metrics-field-2">
					<Label className="main-metrics-label">Period</Label>
					<Label className="input-field-small">
						<div className="small-div-for-double-input">
							<div>
								<input
									className="main-metrics-input-small"
									type="text"
								/>
								<span className="text-near-input-small-3">YEARS</span>
							</div>
							<div>
								<input
									className="main-metrics-input-small"
									type="text"
								/>
								<span className="text-near-input-small-4">YEARS</span>
							</div>
						</div>
					</Label>
				</div>
				<div className="main-metrics-field-2">
					<Label className="main-metrics-label">Handover</Label>
					<Label className="input-field-small">
						<div className="small-div-for-double-input">
							<div>
								<input
									className="main-metrics-input-small"
									type="text"
								/>
								<span className="text-near-input-small-5">YEARS</span>
							</div>
							<div>
								<input
									className="main-metrics-input-small"
									type="text"
								/>
								<span className="text-near-input-small-6">YEARS</span>
							</div>
						</div>
					</Label>
				</div>
			</div>
		</div>
	);
};
