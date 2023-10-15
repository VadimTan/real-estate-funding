import Label from '../../common/Label';
import '../../../styles/mainmetrics.scss';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useState } from 'react';
import Button from '../../common/Button';

export const MainMetrics = ({
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
		<div className="main-metrics-container">
			<div
				className="main-metrics-block-text "
				onClick={changeStateHandler}>
				<h1 className="main-metrics-text">Main Metrics</h1>
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
				className={`main-metrics-fields-container`}>
				<div className="main-metrics-field-1">
					<Label className={'main-metrics-label'}>
						Total Price (общая цена недвижимости)
					</Label>
					<div className="input-field">
						<input
							className="main-metrics-input"
							type="number"
							name="total_price"
							value={formState.total_price}
							onChange={handleChange}
						/>
						<span className="text-near-input">AED</span>
					</div>
				</div>
				<div className="main-metrics-field-1">
					<Label className="main-metrics-label">Price</Label>
					<div className="input-field">
						<input
							className="main-metrics-input"
							type="number"
							name="price"
							value={formState.price}
							onChange={handleChange}
						/>
						<span className="text-near-input">AED</span>
					</div>
				</div>
				<div className="main-metrics-field-2">
					<Label className="main-metrics-label">Annual Profit</Label>
					<div className="input-field-small">
						<div className="small-div-for-double-input">
							<div className="relative">
								<input
									className="main-metrics-input-small"
									type="number"
									name="annual_profit"
									value={formState.annual_profit}
									onChange={handleChange}
								/>
								<span className="text-near-input-small">%</span>
							</div>
							<div className="relative">
								<input
									className="main-metrics-input-small"
									type="number"
									name="annual_profit"
									value={formState.annual_profit}
									onChange={handleChange}
								/>
								<span className="text-near-input-small-2">%</span>
							</div>
						</div>
					</div>
				</div>
				<div className="main-metrics-field-1">
					<Label className="main-metrics-label">Sell Price</Label>
					<div className="input-field">
						<input
							className="main-metrics-input"
							type="number"
							name="sell_price"
							value={formState.sell_price}
							onChange={handleChange}
						/>
						<span className="text-near-input">AED</span>
					</div>
				</div>
				<div className="main-metrics-field-1">
					<Label className="main-metrics-label">App Fee</Label>
					<div className="input-field">
						<input
							className="main-metrics-input"
							type="number"
							name="app_fee"
							value={formState.app_fee}
							onChange={handleChange}
						/>
						<span className="text-near-input-app-fee">%</span>
					</div>
				</div>
				<div className="main-metrics-field-1">
					<Label className="main-metrics-label">Additional Charges</Label>
					<div className="input-field">
						<input
							className="main-metrics-input"
							type="number"
							name="additional_charges"
							value={formState.additional_charges}
							onChange={handleChange}
						/>
						<span className="text-near-input">AED</span>
					</div>
				</div>
				<div className="main-metrics-field-2">
					<Label className="main-metrics-label">Period</Label>
					<div
						id={show}
						className="input-field-months">
						<input
							className="main-metrics-input"
							type="number"
							name="period"
							value={formState.period}
							onChange={handleChange}
						/>
						<span className="text-near-input-months">MONTHS</span>
					</div>
					<div
						id={show}
						className="input-field-small">
						<div className="small-div-for-double-input">
							<div className="relative">
								<input
									className="main-metrics-input-small"
									type="text"
									name="period"
									value={formState.period}
									onChange={handleChange}
								/>
								<span className="text-near-input-small-3">YEARS</span>
							</div>
							<div className="relative">
								<input
									className="main-metrics-input-small"
									type="text"
									name="period"
									value={formState.period}
									onChange={handleChange}
								/>
								<span className="text-near-input-small-4">YEARS</span>
							</div>
						</div>
					</div>
				</div>
				<div
					id={show}
					className="main-metrics-field-2">
					<Label className="main-metrics-label">Handover</Label>
					<div className="input-field-small">
						<div className="small-div-for-double-input">
							<div className="relative">
								<input
									className="main-metrics-input-small"
									type="text"
									name="handover"
									value={formState.handover}
									onChange={handleChange}
								/>
								<span className="text-near-input-small-5">YEARS</span>
							</div>
							<div className="relative">
								<input
									className="main-metrics-input-small"
									type="text"
									name="handover"
									value={formState.handover}
									onChange={handleChange}
								/>
								<span className="text-near-input-small-6">YEARS</span>
							</div>
						</div>
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
