import Button from '../../common/Button';
import '../../../styles/footer.scss';

export const Footer = ({ onSubmit, isAddMode, onUpdate }) => {
	return (
		<div className="footer-container">
			<Button
				type="submit"
				className="footer-button"
				clickHandler={isAddMode ? onSubmit : onUpdate}>
				<span className="text-for-button">
					{isAddMode ? 'Save Changes' : 'Update Changes'}
				</span>
			</Button>
		</div>
	);
};
