import Label from '../../common/Label';
import '../../../styles/mainmetrics.scss';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useState } from 'react';

export const MainMetrics = ({ handleChange, formState }) => {
	const [stateOfIcon, setStateOfIcon] = useState(false);
	const [show, setShow] = useState('closed');

	const changeStateHandler = () => {
		setStateOfIcon((icon) => !icon);
		setShow((state) => (state === 'closed' ? 'show' : 'closed'));
	};

	return (
		<div className="main-metrics-container">
			<div className="main-metrics-block-text">
				<h1 className="main-metrics-text">Main Metrics</h1>
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
				className={`main-metrics-fields-container`}>
				<div className="main-metrics-field-1">
					<Label className={'main-metrics-label'}>
						Total Price (общая цена недвижимости)
					</Label>
					<Label className="input-field">
						<input
							className="main-metrics-input"
							type="number"
							name="total_price"
							value={formState.total_price}
							onChange={handleChange}
						/>
						<span className="text-near-input">AED</span>
					</Label>
				</div>
				<div className="main-metrics-field-1">
					<Label className="main-metrics-label">Price</Label>
					<Label className="input-field">
						<input
							className="main-metrics-input"
							type="number"
							name="price"
							value={formState.price}
							onChange={handleChange}
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
									type="number"
								/>
								<span className="text-near-input-small">%</span>
							</div>
							<div>
								<input
									className="main-metrics-input-small"
									type="number"
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
							type="number"
						/>
						<span className="text-near-input">AED</span>
					</Label>
				</div>
				<div className="main-metrics-field-1">
					<Label className="main-metrics-label">App Fee</Label>
					<Label className="input-field">
						<input
							className="main-metrics-input"
							type="number"
						/>
						<span className="text-near-input-app-fee">%</span>
					</Label>
				</div>
				<div className="main-metrics-field-1">
					<Label className="main-metrics-label">Additional Charges</Label>
					<Label className="input-field">
						<input
							className="main-metrics-input"
							type="number"
						/>
						<span className="text-near-input">AED</span>
					</Label>
				</div>
				<div className="main-metrics-field-2">
					<Label className="main-metrics-label">Period</Label>
					<Label
						id={show}
						className="input-field-months">
						<input
							className="main-metrics-input"
							type="number"
						/>
						<span className="text-near-input-months">MONTHS</span>
					</Label>
					<Label
						id={show}
						className="input-field-small">
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
				<div
					id={show}
					className="main-metrics-field-2">
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
